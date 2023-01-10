import React, { useState } from 'react'
import { useOnDraw } from './Hooks';
import CreateIcon from '@mui/icons-material/Create';
import ClearAllIcon from '@mui/icons-material/ClearAll';

function Drawing() {
    const[erase, setErase] = useState(false)
    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);
    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, (erase)?'white':'#000000', (erase)?50:5);
    }
    const icstyle = erase ? {
        color:"black"
    } : {
        color:"white"
    }

    const imstyle = !erase ? {
        color:"black"
    } : {
        color:"white"
    }

    function drawLine(
        start,
        end,
        ctx,
        color,
        width
    ) {
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
        ctx.fill();

    }
    const canstyle = {
        backgroundColor:"white",
        borderRadius:"25px"
    }
    return (
        <div className='draw' style={{padding: "1%" }}>
            <div>
                <h2 style={{color:"white"}}>Draw</h2>
            </div>
            <div>
                <canvas
                    style={canstyle}
                    width={'700'}
                    height={'500'}
                    onMouseDown={onCanvasMouseDown}
                    ref={setCanvasRef}></canvas>
            </div>
            <div>
                <button onClick={()=>{setErase(true)}} style={{background:"none",border:"none"}}><div style={icstyle}><img style={{width:'30px'}} src='https://cdn-icons-png.flaticon.com/512/979/979773.png'></img></div></button>
                <button onClick={()=>{setErase(false)}} style={{background:"none",border:"none"}}><div style={imstyle}><img style={{marginLeft:'40px',width:'40px'}} src='https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/pencil-icon.png'></img></div></button>
                
            </div>
        </div>
    )
}

export default Drawing
