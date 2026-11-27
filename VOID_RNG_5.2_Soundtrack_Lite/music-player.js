/* Local-only soundtrack controller. One HTMLAudioElement; no audio data in game snapshots. */
(()=>{'use strict';
const tracks=[
  {
    "file": "exotic-apex.mp3",
    "title": "Exotic: APEX",
    "artist": "Sol’s RNG",
    "context": "reveal"
  },
  {
    "file": "chromatic-exotic.mp3",
    "title": "Chromatic Exotic",
    "artist": "Sol’s RNG",
    "context": "reveal"
  },
  {
    "file": "solar-damnation.mp3",
    "title": "Solar Damnation",
    "artist": "Tower Defense Simulator",
    "context": "boss"
  },
  {
    "file": "wait-and-bleed.mp3",
    "title": "Wait and Bleed",
    "artist": "Slipknot",
    "context": "boss"
  },
  {
    "file": "everlong.mp3",
    "title": "Everlong",
    "artist": "Foo Fighters",
    "context": "world"
  },
  {
    "file": "upswingin.mp3",
    "title": "Upswingin’",
    "artist": "Whiplash soundtrack",
    "context": "world"
  },
  {
    "file": "caravan.mp3",
    "title": "Caravan",
    "artist": "Provided track",
    "context": "dungeon"
  },
  {
    "file": "jane.mp3",
    "title": "Jane!",
    "artist": "Provided track",
    "context": "world"
  }
];
const el=id=>document.getElementById(id),bar=el('musicBar'),home=el('musicHome'),audio=new Audio();audio.preload='none';
let opts={volume:45,combat:75,cinematic:85,shuffle:false,repeat:'all',adaptive:true,track:0};
try{let s=JSON.parse(localStorage.getItem('void-rng.music.v1')||'null');if(s&&typeof s==='object')for(const k of Object.keys(opts))if(typeof s[k]===typeof opts[k])opts[k]=s[k];}catch{}
const bounded=v=>Math.min(100,Math.max(0,Number.isFinite(+v)?+v:0));for(const k of ['volume','combat','cinematic'])opts[k]=bounded(opts[k]);if(!['all','one','off'].includes(opts.repeat))opts.repeat='all';if(!Number.isInteger(opts.track)||!tracks[opts.track])opts.track=0;
let idx=opts.track,loaded=-1,playingWanted=false,manual=false,context='world',contextResume=null,shuffled=[],duck=1,requestedContext='world',contextSince=0,loadGeneration=0;
function persist(){opts.track=contextResume?contextResume.i:idx;try{localStorage.setItem('void-rng.music.v1',JSON.stringify(opts));}catch{}}
function fmt(t){if(!Number.isFinite(t))return '0:00';t=Math.floor(Math.max(0,t));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0');}
function volume(){audio.volume=opts.volume/100*duck;el('musicVolumeValue').textContent=opts.volume+'%';el('musicMute').textContent=opts.volume===0?'UNMUTE':'MUTE';}
function label(){const t=tracks[idx];el('musicTitle').textContent=t.title;el('musicArtist').textContent=t.artist;el('musicSelect').value=String(idx);el('musicPlay').textContent=audio.paused?'▶ PLAY':'Ⅱ PAUSE';el('musicShuffle').setAttribute('aria-pressed',String(opts.shuffle));el('musicShuffle').textContent='SHUFFLE '+(opts.shuffle?'ON':'OFF');el('musicRepeat').textContent='REPEAT '+opts.repeat.toUpperCase();el('musicRepeat').setAttribute('aria-pressed',String(opts.repeat!=='off'));}
function time(){const d=audio.duration,t=audio.currentTime;el('musicTime').textContent=fmt(t)+' / '+fmt(d);el('musicSeek').disabled=!(d>0&&Number.isFinite(d));if(!el('musicSeek').matches(':active'))el('musicSeek').value=d>0&&Number.isFinite(d)?Math.round(t/d*1000):0;}
function status(s){el('musicStatus').textContent=s;}
function select(i,position=0){idx=(i+tracks.length)%tracks.length;loaded=idx;const generation=++loadGeneration;audio.src='./music/'+tracks[idx].file;audio.preload='metadata';if(position>0){audio.addEventListener('loadedmetadata',()=>{if(generation===loadGeneration)try{audio.currentTime=Math.min(position,audio.duration||position);}catch{}},{once:true});}label();time();persist();}
async function play(){playingWanted=true;if(loaded!==idx)select(idx);try{await audio.play();status('');}catch(e){playingWanted=false;status(e.name==='NotAllowedError'?'Click Play to enable audio.':'Track could not play. Try another song.');}label();}
function pause(){playingWanted=false;audio.pause();label();}
function nextIndex(delta){if(!opts.shuffle)return (idx+delta+tracks.length)%tracks.length;if(delta<0&&shuffled.length)return shuffled.pop();let pool=tracks.map((_,i)=>i).filter(i=>i!==idx);shuffled.push(idx);if(shuffled.length>50)shuffled.shift();return pool[Math.floor(Math.random()*pool.length)];}
function choose(i,autoplay=playingWanted){contextResume=null;manual=true;select(i);if(autoplay)play();}
function changeContext(next){if(next===context)return;context=next;if(!opts.adaptive||!playingWanted)return; if(next==='world'){if(contextResume){let r=contextResume;contextResume=null;select(r.i,r.pos);play();}return;}if(!contextResume)contextResume={i:idx,pos:audio.currentTime||0};let choices=tracks.map((t,i)=>t.context===next?i:-1).filter(i=>i>=0);if(choices.length&&!choices.includes(idx)){select(choices[Math.floor(Math.random()*choices.length)]);play();}}
function updateContext({boss=false,dungeon=false,cinema=false}={}){const next=boss?'boss':dungeon?'dungeon':'world';if(next!==requestedContext){requestedContext=next;contextSince=performance.now();}if(next!==context&&performance.now()-contextSince>=1500)changeContext(next);let f=cinema ? .22 : 1;if(f!==duck){duck=f;volume();}}
for(const [i,t] of tracks.entries()){const option=document.createElement('option');option.value=i;option.textContent=t.title+' · '+t.artist;el('musicSelect').appendChild(option);}
el('musicPlay').onclick=()=>{manual=true;audio.paused?play():pause();};el('musicPrev').onclick=()=>choose(nextIndex(-1));el('musicNext').onclick=()=>choose(nextIndex(1));el('musicSelect').onchange=e=>choose(+e.target.value,true);el('musicShuffle').onclick=()=>{opts.shuffle=!opts.shuffle;shuffled=[];label();persist();};el('musicRepeat').onclick=()=>{opts.repeat=({all:'one',one:'off',off:'all'})[opts.repeat];label();persist();};
let previousVolume=opts.volume||45;el('musicMute').onclick=()=>{if(opts.volume){previousVolume=opts.volume;opts.volume=0;}else opts.volume=previousVolume;el('musicVolume').value=opts.volume;volume();persist();};
for(const [id,key] of [['musicVolume','volume'],['combatVolume','combat'],['cinematicVolume','cinematic']]){let node=el(id);node.value=opts[key];if(key!=='volume')el(id+'Value').textContent=opts[key]+'%';node.oninput=()=>{opts[key]=bounded(node.value);if(key==='volume')volume();else el(id+'Value').textContent=opts[key]+'%';persist();};}
el('musicAdaptive').checked=opts.adaptive;el('musicAdaptive').onchange=e=>{opts.adaptive=e.target.checked;if(!opts.adaptive&&contextResume){let r=contextResume;contextResume=null;select(r.i,r.pos);if(playingWanted)play();}persist();};
el('musicSeek').oninput=e=>{if(Number.isFinite(audio.duration)&&audio.duration>0)audio.currentTime=+e.target.value/1000*audio.duration;time();};
audio.addEventListener('timeupdate',time);audio.addEventListener('loadedmetadata',time);audio.addEventListener('durationchange',time);audio.addEventListener('play',label);audio.addEventListener('pause',label);audio.addEventListener('error',()=>{playingWanted=false;status('Audio unavailable. Check the music folder or choose another song.');label();});audio.addEventListener('ended',()=>{if(!playingWanted)return;if(opts.repeat==='one'){audio.currentTime=0;play();return;}if(opts.repeat==='off'&&!opts.shuffle&&idx===tracks.length-1){pause();return;}let pool=opts.adaptive&&context!=='world'&&contextResume?tracks.map((t,i)=>t.context===context?i:-1).filter(i=>i>=0):[];let next=pool.length?pool[(pool.indexOf(idx)+1)%pool.length]:nextIndex(1);select(next);play();});
// Start music only on deliberate user interaction, never on page load.
el('start').addEventListener('click',()=>{if(!manual&&!playingWanted){manual=true;play();}});
window.VoidMusic={context:updateContext,gain:kind=>opts[kind]/100,fullscreen:on=>{if(on)document.querySelector('[data-pane="world"]').insertBefore(bar,document.querySelector('.mapfoot'));else home.appendChild(bar);},tracks};
volume();label();time();
})();
