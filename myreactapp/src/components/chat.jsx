import './app.css'

function chat({firstname , lastname , gmail, click}){

    function handleclick(e){
        click(e);
    }
    return(
        <div style={{display:"flex", alignItems:"center",width:'7em' }}>
<svg width="60" height="60" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <circle cx="64" cy="64" r="64" fill="#E4E6EB"/>
  <circle cx="64" cy="50" r="22" fill="#BCC0C4"/>
  <path d="M32 112c0-20 16-32 32-32s32 12 32 32" fill="#BCC0C4"/>
</svg>
<span style={{fontSize:"0.7em", paddingLeft:"5px",cursor:"pointer", overflow:"hidden"}} onClick={handleclick}>{firstname}&nbsp;{lastname}</span>
</div>
    );


}

export default chat ;