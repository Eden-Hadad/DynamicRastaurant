import Clock from "./Clock";

export default function Form() {
 
  
  return (
    <>
    <Clock/>
    <div id="clock">

    </div>
    <form action="post">
        <span>how many<input type="number" min={1} max={8} /></span>
        <br/>
        <span>choose date<input type="datetime-local"/></span>
        <br />
        <span>where will u sit?</span>
        <button>outside</button>
        <button>inside</button>
    </form>
        
    </>
  )
}