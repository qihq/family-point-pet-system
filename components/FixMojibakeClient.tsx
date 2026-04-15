"use client";
import { useEffect } from "react";

function decodeMojibake(s: string): string {
  try {
    // try decode classic UTF-8 interpreted as Latin-1 pattern
    const decoded = decodeURIComponent(escape(s));
    // Heuristic: only replace when decoded shows CJK
    if (/[åæçéèíóúÀ-ÿ]/.test(s) && /[\u4e00-\u9fff]/.test(decoded) && decoded !== s) return decoded;
    return s;
  } catch { return s; }
}

export default function FixMojibakeClient(){
  useEffect(()=>{
    try{
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) {
        const n = walker.currentNode as Text;
        if(!n.nodeValue) continue;
        if(n.parentElement && (n.parentElement.tagName === 'SCRIPT' || n.parentElement.tagName === 'STYLE')) continue;
        nodes.push(n);
      }
      nodes.forEach(n=>{
        const orig = n.nodeValue || '';
        if(/[åæçéèíóúÀ-ÿ]/.test(orig) && !/[\u4e00-\u9fff]/.test(orig)){
          const fixed = decodeMojibake(orig);
          if(fixed !== orig) n.nodeValue = fixed;
        }
      });
    }catch{}
  },[]);
  return null;
}
