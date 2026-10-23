import { useState } from 'react';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';
import "./PreviewDrawer.css";
 
export default function PreviewDrawer({originalImage}) {
    const [open,setOpen]=useState(false);
 
    if(!originalImage) return null;
 
    return (
        <>
        <button
        className="preview-btn fixed"
        style={{
            background:'var(--color-surface-raised)',
            width:'3rem',
            height:'3rem',
            borderRadius:'50%',
            boxShadow:'0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
        onClick={()=>setOpen(prev=>!prev)}
        aria-label={open?'Hide Preview':'Show Preview'}>
            {open?<EyeOff size={20} />:<Eye size={20} />}
        </button>
 
        <div className="preview-drawer fixed"
            style={{
                width:'clamp(200px,40vw,320px)'
            }}>
 
                <div className="previewbox"
                style={{transform:open?'translateX(0)':'translateX(calc(100% + 1rem))',transition:'transform 0.35s cubic-bezier(0.4,0,0.2,1)'}}>
 
                    <div className="preview-header"
                    ><ChevronRight
                    size={16}
                    className="text-text-muted"
                    style={{transform:open?'rotate(180deg)':'rotate(0)',transition:'transform 0.3s ease'}}/>
                    
                    <span className="preview-title">
                        reference
                    </span>
                    
                    </div>
 
                    <img
                    src={originalImage}
                    alt="original image"
                    className="preview-img"
                    style={{aspectRatio:'1/1',objectFit:'cover'}}
                    />
 
                </div>
 
        </div>
 
        </>
    );
}
 
