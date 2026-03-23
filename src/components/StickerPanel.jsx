export default function StickerPanel(){

const stickers = ["😀","😂","😍","👍","🔥","🎉"]

return(

<div style={{marginTop:"10px"}}>

{stickers.map((s,i)=>(
<button
key={i}
style={{fontSize:"24px",margin:"5px"}}
>
{s}
</button>
))}

</div>

)

}