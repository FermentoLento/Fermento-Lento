import { useState, useEffect } from "react";

const C = { bg:"#1A0F06",surface:"#241508",card:"#2C1A0A",cardHov:"#321D0C",border:"#3D2510",gold:"#C8960A",goldLt:"#E0B020",cream:"#F0DEB8",muted:"#8A7060",text:"#F5ECD8",orange:"#D4700A" };
const DISC = { FERMENTO10:10, INSTAGRAM15:15, BIENVENIDO20:20 };
const pop = {};
const hist = [];

const ITEMS = [
  {id:"sc1",cat:"Salada Clásica",emoji:"🍞",name:"Natural",               sub:"Hogaza clásica · Fermentación 12h",         price:400,ing:["Harina de trigo","Agua","Sal","Masa madre"],traits:["sencillo","clásico","versátil"],pers:["minimalista","tradicional"]},
  {id:"sc2",cat:"Salada Clásica",emoji:"🧈",name:"Mantequilla Europea",    sub:"Con mantequilla europea premium",            price:450,ing:["Harina","Masa madre","Mantequilla europea 82%","Sal"],traits:["suave","mantecoso","cremoso"],pers:["sofisticado","gourmet"]},
  {id:"sc3",cat:"Salada Clásica",emoji:"🧀",name:"Cheddar con Mantequilla",sub:"Queso cheddar & mantequilla",                price:600,ing:["Harina","Masa madre","Cheddar curado","Mantequilla","Sal"],traits:["intenso","salado","cremoso"],pers:["intenso","amante del queso"]},
  {id:"sc4",cat:"Salada Clásica",emoji:"🌿",name:"Parmesano y Orégano",    sub:"Parmesano rallado & orégano fresco",         price:500,ing:["Harina","Masa madre","Parmesano Reggiano","Orégano fresco","Sal"],traits:["aromático","italiano","umami"],pers:["foodie","mediterráneo"]},
  {id:"sc5",cat:"Salada Clásica",emoji:"🧄",name:"Ajo Rostizado y Romero", sub:"Ajo confitado & romero aromático",           price:450,ing:["Harina","Masa madre","Ajo rostizado","Romero","Aceite de oliva","Sal"],traits:["aromático","potente","rústico"],pers:["aventurero","cocinero"]},
  {id:"g1", cat:"Gourmet",       emoji:"🍅",name:"Tomate Seco Parmesano",  sub:"Tomates deshidratados & parmesano curado",  price:450,ing:["Harina","Masa madre","Tomates secos","Parmesano","Albahaca","Sal"],traits:["mediterráneo","umami","sofisticado"],pers:["viajero","refinado"]},
  {id:"g2", cat:"Gourmet",       emoji:"🧅",name:"Cebolla y Gruyère",      sub:"Cebolla dulce & queso gruyère importado",   price:600,ing:["Harina","Masa madre","Cebolla caramelizada","Gruyère","Tomillo","Sal"],traits:["dulce-salado","francés","complejo"],pers:["gourmet","sofisticado"]},
  {id:"g3", cat:"Gourmet",       emoji:"🫙",name:"Pesto",                  sub:"Albahaca fresca, piñones & parmesano",      price:450,ing:["Harina","Masa madre","Pesto de albahaca","Piñones","Parmesano"],traits:["fresco","herbáceo","ligero"],pers:["saludable","fresco"]},
  {id:"d1", cat:"Dulce",         emoji:"🍫",name:"Cacao con Chispas",      sub:"Cacao puro & chispas de chocolate",         price:500,ing:["Harina","Masa madre","Cacao 70%","Chispas de chocolate","Azúcar"],traits:["chocolatoso","indulgente","intenso"],pers:["goloso","apasionado"]},
  {id:"d2", cat:"Dulce",         emoji:"🍓",name:"Guayaba y Queso Crema",  sub:"Guayaba tropical & queso crema suave",      price:600,ing:["Harina","Masa madre","Pasta de guayaba","Queso crema","Azúcar"],traits:["tropical","dulce-ácido","caribeño"],pers:["nostálgico","caribeño"]},
  {id:"d3", cat:"Dulce",         emoji:"🧸",name:"Canela y Azúcar",        sub:"Canela molida & azúcar moscabado",          price:450,ing:["Harina","Masa madre","Canela de Ceilán","Azúcar moscabado","Mantequilla"],traits:["cálido","reconfortante","especiado"],pers:["hogareño","cálido"]},
  {id:"d4", cat:"Dulce",         emoji:"🫐",name:"Miel y Arándanos",       sub:"Miel artesanal & arándanos frescos",        price:550,ing:["Harina","Masa madre","Miel artesanal","Arándanos frescos","Sal marina"],traits:["natural","saludable","balanceado"],pers:["saludable","balanceado"]},
  {id:"d5", cat:"Dulce",         emoji:"🍓",name:"Fresa y Miel",           sub:"Fresas naturales & miel de abejas",         price:550,ing:["Harina","Masa madre","Fresas frescas","Miel artesanal","Vainilla"],traits:["frutal","ligero","fresco"],pers:["romántico","fresco"]},
];

const PLANS = [
  {id:"ind", name:"Plan Individual",emoji:"🍞",   price:400, desc:"1 pan por semana",       n:1,             perks:["1 hogaza semanal","Fermentación 12h","Cancela cuando quieras"],color:"#5A3A10"},
  {id:"par", name:"Plan Pareja",    emoji:"🍞🍞", price:750, desc:"2 panes por semana",     n:2, popular:true,perks:["2 hogazas semanales","Entrega coordinada","Cancela cuando quieras"],color:"#C8960A"},
  {id:"fam", name:"Plan Familiar",  emoji:"🍞🍞🍞",price:1300,desc:"3 panes + 1 focaccia",  n:3, foc:true,    perks:["3 hogazas semanales","1 focaccia artesanal incluida","Prioridad en pedidos"],color:"#D4700A"},
];

const COMBOS = [
  {id:"c1",name:"Desayuno Completo",emoji:"☀️",ids:["sc2","sc4"],pct:8, desc:"Mantequilla Europea + Parmesano y Orégano"},
  {id:"c2",name:"Dulce & Salado",   emoji:"🎭",ids:["sc3","d3"], pct:10,desc:"Cheddar con Mantequilla + Canela y Azúcar"},
  {id:"c3",name:"Gourmet Total",    emoji:"👑",ids:["g2","g1"],  pct:12,desc:"Cebolla y Gruyère + Tomate Seco Parmesano"},
];

const REVS = {
  sc1:[{n:"Carlos M.",s:5,t:"El pan más sencillo y perfecto."}],
  sc2:[{n:"Luis P.",s:5,t:"La mantequilla europea hace toda la diferencia."}],
  sc3:[{n:"María T.",s:5,t:"El cheddar derretido por dentro... espectacular."},{n:"Jorge V.",s:4,t:"Rico pero muy llenador."}],
  sc4:[{n:"Sofia A.",s:5,t:"El orégano fresco le da un toque increíble."}],
  sc5:[{n:"Pedro L.",s:5,t:"El ajo rostizado es una locura de sabor."}],
  g1: [{n:"Roberto F.",s:5,t:"Tomate seco + parmesano = combinación ganadora."}],
  g2: [{n:"Valeria M.",s:5,t:"El gruyère caramelizado es puro lujo artesanal."},{n:"Diego N.",s:5,t:"El mejor del menú."}],
  g3: [{n:"Natalia C.",s:4,t:"El pesto es fresco y aromático."}],
  d1: [{n:"Isabella R.",s:5,t:"El cacao es intensísimo."}],
  d2: [{n:"Miguel A.",s:5,t:"La guayaba me recuerda a mi abuela."}],
  d3: [{n:"Andrés B.",s:5,t:"Canela y azúcar moscabado: reconfortante total."}],
  d4: [{n:"Laura G.",s:4,t:"Saludable y delicioso."}],
  d5: [{n:"Fernanda O.",s:5,t:"La fresa fresca con miel es mi debilidad."}],
};

const QUIZ=[
  {q:"¿Cómo es tu desayuno ideal?",opts:[{l:"Simple y rápido 🍳",t:["minimalista","tradicional"]},{l:"Elaborado y con café ☕",t:["sofisticado","gourmet"]},{l:"Dulce y reconfortante 🍯",t:["hogareño","cálido","goloso"]},{l:"Ligero y saludable 🥗",t:["saludable","balanceado","fresco"]}]},
  {q:"¿Qué tipo de persona eres en la cocina?",opts:[{l:"Como lo que hay 😄",t:["minimalista","tradicional"]},{l:"Me gusta experimentar 🧪",t:["aventurero","foodie","viajero"]},{l:"Recetas clásicas con cariño 👨‍🍳",t:["hogareño","tradicional"]},{l:"Busco ingredientes premium 🌟",t:["gourmet","sofisticado"]}]},
  {q:"¿A dónde viajarías ahora?",opts:[{l:"Italia 🇮🇹",t:["mediterráneo","refinado","foodie"]},{l:"El Caribe 🌴",t:["caribeño","nostálgico"]},{l:"Francia 🇫🇷",t:["gourmet","sofisticado"]},{l:"Montaña 🏔️",t:["saludable","fresco"]}]},
  {q:"¿Cómo es tu paleta de sabores?",opts:[{l:"Salado y potente 🧂",t:["intenso","amante del queso","cocinero"]},{l:"Dulce y suave 🍬",t:["goloso","romántico","nostálgico"]},{l:"Equilibrado ⚖️",t:["balanceado","minimalista"]},{l:"Aromático y especiado 🌶️",t:["aventurero","curioso"]}]},
];

const findItem = id => ITEMS.find(i=>i.id===id);
const Stars = ({n}) => <span>{[0,1,2,3,4].map(i=><span key={i} style={{color:i<n?C.gold:C.border,fontSize:12}}>★</span>)}</span>;

function Modal({children,onClose}) {
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:16,overflowY:"auto"}}>
      <div onClick={e=>e.stopPropagation()} style={{maxWidth:440,width:"100%",maxHeight:"90vh",overflowY:"auto",borderRadius:12,margin:"auto"}}>
        {children}
      </div>
    </div>
  );
}

function PopBadge({itemId}) {
  const s=Object.entries(pop).sort((a,b)=>b[1]-a[1]);
  if(!s.length||s[0][0]!==itemId||s[0][1]<2) return null;
  return <div style={{position:"absolute",top:8,right:8,background:C.orange,color:"#fff",fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:10,zIndex:2}}>🔥 POPULAR</div>;
}

function ItemModal({item,qty,onAdd,onDel,onClose,isFav,onFav}) {
  const revs=REVS[item.id]||[];
  const avg=revs.length?Math.round(revs.reduce((s,r)=>s+r.s,0)/revs.length):0;
  return (
    <Modal onClose={onClose}>
      <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:12,overflow:"hidden"}}>
        <div style={{background:"linear-gradient(135deg,"+C.surface+","+C.card+")",padding:"22px 18px 16px",textAlign:"center",borderBottom:"1px solid "+C.border,position:"relative"}}>
          <button onClick={onFav} style={{position:"absolute",top:10,right:10,background:"none",border:"none",fontSize:20,cursor:"pointer",opacity:isFav?1:0.35}}>{isFav?"❤️":"🤍"}</button>
          <div style={{fontSize:56,marginBottom:8}}>{item.emoji}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:700,color:C.cream}}>{item.name}</div>
          <div style={{fontSize:12,color:C.muted,marginTop:3}}>{item.sub}</div>
          {avg>0&&<div style={{marginTop:4}}><Stars n={avg}/><span style={{fontSize:11,color:C.muted,marginLeft:4}}>({revs.length} reseña{revs.length>1?"s":""})</span></div>}
          <div style={{fontSize:19,fontWeight:700,color:C.gold,marginTop:5}}>RD$ {item.price}</div>
        </div>
        <div style={{padding:"12px 14px 0"}}>
          <div style={{fontSize:10,color:C.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>Características</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {item.traits.map(t=><span key={t} style={{background:C.surface,border:"1px solid "+C.border,borderRadius:10,padding:"3px 9px",fontSize:11,color:C.cream}}>{t}</span>)}
          </div>
        </div>
        <div style={{padding:"12px 14px"}}>
          <div style={{fontSize:10,color:C.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>🌾 Ingredientes</div>
          {item.ing.map((g,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"4px 0",borderBottom:i<item.ing.length-1?"1px solid "+C.border+"44":"none"}}>
              <div style={{width:4,height:4,borderRadius:"50%",background:C.gold,flexShrink:0}}/>
              <span style={{fontSize:13,color:C.cream}}>{g}</span>
            </div>
          ))}
        </div>
        {revs.length>0&&(
          <div style={{padding:"0 14px 12px"}}>
            <div style={{fontSize:10,color:C.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>💬 Reseñas</div>
            {revs.map((r,i)=>(
              <div key={i} style={{background:C.surface,border:"1px solid "+C.border,borderRadius:8,padding:"9px 11px",marginBottom:7}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,fontWeight:700,color:C.cream}}>{r.n}</span><Stars n={r.s}/></div>
                <div style={{fontSize:12,color:C.muted,fontStyle:"italic"}}>"{r.t}"</div>
              </div>
            ))}
          </div>
        )}
        <div style={{padding:"0 14px 7px",display:"flex",gap:7}}>
          {qty>0
            ?<div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
               <button onClick={onDel} style={{width:34,height:34,borderRadius:"50%",border:"1px solid "+C.border,background:C.surface,color:C.cream,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
               <span style={{fontWeight:700,color:C.gold,fontSize:17,minWidth:18,textAlign:"center"}}>{qty}</span>
               <button onClick={onAdd} style={{width:34,height:34,borderRadius:"50%",border:"none",background:C.gold,color:C.bg,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
             </div>
            :<button onClick={onAdd} style={{flex:1,padding:"11px 0",background:"linear-gradient(135deg,"+C.gold+","+C.goldLt+")",color:C.bg,border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:"pointer"}}>+ Agregar al carrito</button>
          }
        </div>
        <div style={{padding:"6px 14px 13px"}}>
          <button onClick={onClose} style={{width:"100%",padding:"9px",background:"transparent",border:"1px solid "+C.border,borderRadius:8,color:C.muted,fontSize:13,cursor:"pointer"}}>Cerrar</button>
        </div>
      </div>
    </Modal>
  );
}

function QuizView({onAdd}) {
  const [step,setStep]=useState(0),[ans,setAns]=useState([]),[res,setRes]=useState([]);
  const pick=t=>{
    const next=[...ans,t];
    if(step<QUIZ.length-1){setAns(next);setStep(s=>s+1);}
    else{
      const tc={};next.forEach(tt=>tt.forEach(tag=>{tc[tag]=(tc[tag]||0)+1;}));
      setRes(ITEMS.map(i=>({...i,score:i.pers.reduce((s,p)=>s+(tc[p]||0),0)})).sort((a,b)=>b.score-a.score));
      setAns(next);setStep(QUIZ.length);
    }
  };
  if(step<QUIZ.length){
    const q=QUIZ[step];
    return (
      <div style={{padding:"18px 14px"}}>
        <div style={{display:"flex",gap:3,marginBottom:18}}>{QUIZ.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=step?C.gold:C.border}}/>)}</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:5}}>Pregunta {step+1} de {QUIZ.length}</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:C.cream,marginBottom:20,lineHeight:1.3}}>{q.q}</div>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {q.opts.map((opt,i)=><button key={i} onClick={()=>pick(opt.t)} style={{padding:"14px 15px",background:C.card,border:"1px solid "+C.border,borderRadius:10,color:C.cream,fontSize:14,fontFamily:"Georgia,serif",cursor:"pointer",textAlign:"left"}}>{opt.l}</button>)}
        </div>
      </div>
    );
  }
  return (
    <div style={{padding:"18px 14px"}}>
      <div style={{textAlign:"center",marginBottom:18}}><div style={{fontSize:38,marginBottom:7}}>✨</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:700,color:C.cream,marginBottom:3}}>Tu pan ideal</div><div style={{fontSize:13,color:C.muted}}>Basado en tu personalidad</div></div>
      {res.slice(0,3).map((item,i)=>(
        <div key={item.id} style={{display:"flex",alignItems:"center",padding:"12px 13px",marginBottom:9,background:i===0?C.cardHov:C.card,borderRadius:10,border:"1px solid "+(i===0?C.gold+"88":C.border),position:"relative"}}>
          {i===0&&<div style={{position:"absolute",top:-9,left:12,background:C.gold,color:C.bg,fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:10}}>⭐ MEJOR MATCH</div>}
          <div style={{fontSize:32,marginRight:11}}>{item.emoji}</div>
          <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:C.cream}}>{item.name}</div><div style={{fontSize:11,color:C.muted,marginTop:1}}>{item.sub}</div><div style={{fontSize:13,fontWeight:700,color:C.gold,marginTop:3}}>RD$ {item.price}</div></div>
          <button onClick={()=>onAdd(item.id)} style={{padding:"8px 12px",background:C.gold,border:"none",borderRadius:7,color:C.bg,fontSize:12,fontWeight:700,cursor:"pointer"}}>+ Agregar</button>
        </div>
      ))}
      <button onClick={()=>{setStep(0);setAns([]);setRes([]);}} style={{width:"100%",marginTop:7,padding:"11px",background:"transparent",border:"1px solid "+C.border,borderRadius:8,color:C.muted,fontSize:13,cursor:"pointer"}}>🔄 Repetir quiz</button>
    </div>
  );
}

function PanMes({onAdd}) {
  const [added,setAdded]=useState(false);
  return (
    <div style={{padding:14}}>
      <div style={{background:"linear-gradient(135deg,#1A0A00,#2C1400)",border:"2px solid "+C.gold,borderRadius:12,padding:"20px 16px",marginBottom:12,textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:10,right:10,background:"#8B0000",color:"#fff",fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:10}}>⚡ EDICIÓN LIMITADA</div>
        <div style={{fontSize:60,marginBottom:8}}>🌟</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,color:C.cream,lineHeight:1.2}}>Hogaza Negra de Carbón y Queso Azul</div>
        <div style={{fontSize:11,color:C.gold,marginTop:5}}>Edición limitada · Solo durante mayo</div>
        <div style={{fontSize:22,fontWeight:700,color:C.gold,marginTop:7}}>RD$ 750</div>
        <div style={{marginTop:10}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.muted,marginBottom:4}}><span>Disponibilidad</span><span style={{color:"#E05050",fontWeight:700}}>7 restantes</span></div>
          <div style={{height:5,background:C.border,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:"35%",background:"linear-gradient(90deg,"+C.orange+","+C.gold+")",borderRadius:3}}/></div>
        </div>
      </div>
      <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:10,padding:13,marginBottom:11}}>
        <div style={{fontSize:10,color:C.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>✍️ La historia</div>
        <div style={{fontSize:13,color:C.cream,lineHeight:1.7,fontStyle:"italic"}}>"Carbón activado y queso azul importado. Un contraste visual y de sabor que no encontrarás en ningún otro lugar. Solo 20 unidades por semana."</div>
      </div>
      <button onClick={()=>{onAdd("pdm1");setAdded(true);}} style={{width:"100%",padding:"14px",background:added?"#1A3A10":"linear-gradient(135deg,"+C.gold+","+C.goldLt+")",color:added?"#8ADA60":C.bg,border:added?"2px solid #4ACA30":"none",borderRadius:8,fontFamily:"Georgia,serif",fontSize:14,fontWeight:700,cursor:"pointer"}}>
        {added?"✓ Agregado al carrito":"+ Quiero este pan"}
      </button>
    </div>
  );
}

function Membresia() {
  const [sel,setSel]=useState(null),[sent,setSent]=useState(false);
  const [form,setForm]=useState({name:"",phone:"",addr:"",b1:"",b2:"",b3:"",notes:""});
  const plan=PLANS.find(p=>p.id===sel);
  if(sent) return <div style={{padding:"44px 16px",textAlign:"center"}}><div style={{fontSize:52,marginBottom:10}}>🎉</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:C.cream,marginBottom:7}}>¡Membresía solicitada!</div><div style={{fontSize:13,color:C.muted}}>Te contactaremos al <span style={{color:C.gold}}>{form.phone}</span></div><button onClick={()=>{setSel(null);setSent(false);setForm({name:"",phone:"",addr:"",b1:"",b2:"",b3:"",notes:""});}} style={{marginTop:18,padding:"11px 26px",background:C.gold,border:"none",borderRadius:18,color:C.bg,fontSize:13,fontWeight:700,cursor:"pointer"}}>Volver</button></div>;
  if(sel&&plan) return (
    <div style={{padding:14}}>
      <button onClick={()=>setSel(null)} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:12,marginBottom:12,fontFamily:"Georgia,serif"}}>← Volver</button>
      <div style={{background:C.card,border:"2px solid "+plan.color,borderRadius:10,padding:14,marginBottom:12,textAlign:"center"}}>
        <div style={{fontSize:24}}>{plan.emoji}</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:C.cream,marginTop:3}}>{plan.name}</div>
        <div style={{fontSize:19,fontWeight:700,color:plan.color,marginTop:3}}>RD$ {plan.price}<span style={{fontSize:11,color:C.muted}}>/sem</span></div>
      </div>
      {[{l:"👤 Nombre",k:"name",t:"text",p:"Tu nombre"},{l:"📱 WhatsApp",k:"phone",t:"tel",p:"829-628-6471"},{l:"📍 Dirección",k:"addr",t:"text",p:"Calle, sector, ciudad"}].map(f=>(
        <div key={f.k} style={{marginBottom:10}}>
          <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:4}}>{f.l}</label>
          <input type={f.t} value={form[f.k]} placeholder={f.p} onChange={e=>setForm(fm=>({...fm,[f.k]:e.target.value}))}
            style={{width:"100%",padding:"9px 11px",border:"1px solid "+C.border,borderRadius:6,fontFamily:"Georgia,serif",fontSize:14,background:C.surface,color:C.cream}}/>
        </div>
      ))}
      {Array.from({length:plan.n},(_,n)=>{const key="b"+(n+1);return(
        <div key={key} style={{marginBottom:10}}>
          <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:4}}>🍞 Hogaza #{n+1}</label>
          <select value={form[key]} onChange={e=>setForm(fm=>({...fm,[key]:e.target.value}))} style={{width:"100%",padding:"9px 11px",border:"1px solid "+C.border,borderRadius:6,fontFamily:"Georgia,serif",fontSize:14,background:C.surface,color:form[key]?C.cream:C.muted}}>
            <option value="">Selecciona...</option>
            {ITEMS.map(i=><option key={i.id} value={i.name}>{i.emoji} {i.name}</option>)}
          </select>
        </div>
      );})}
      {plan.foc&&<div style={{background:"#1C1000",border:"1px solid "+C.gold+"66",borderRadius:8,padding:"8px 11px",fontSize:12,color:C.gold,marginBottom:10}}>🫓 Incluye <strong>1 focaccia artesanal</strong> cada semana</div>}
      <button onClick={()=>{if(!form.name||!form.phone||!form.addr)return alert("Completa nombre, teléfono y dirección.");setSent(true);}} style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,"+plan.color+","+C.goldLt+")",color:C.bg,border:"none",borderRadius:8,fontFamily:"Georgia,serif",fontSize:14,fontWeight:700,cursor:"pointer"}}>✓ Solicitar membresía</button>
    </div>
  );
  return (
    <div style={{padding:14}}>
      <div style={{textAlign:"center",marginBottom:16}}><div style={{fontSize:34,marginBottom:7}}>📦</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:700,color:C.cream,marginBottom:3}}>Membresía Semanal</div><div style={{fontSize:12,color:C.muted}}>Recibe tus hogazas sin recordar el pedido</div></div>
      {PLANS.map(p=>(
        <div key={p.id} style={{position:"relative",background:C.card,border:"2px solid "+(p.popular?C.gold:C.border),borderRadius:11,padding:"15px",marginBottom:11}}>
          {p.popular&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:C.gold,color:C.bg,fontSize:10,fontWeight:700,padding:"2px 12px",borderRadius:10,whiteSpace:"nowrap"}}>⭐ MÁS POPULAR</div>}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:9}}>
            <div style={{fontSize:22}}>{p.emoji}</div>
            <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:C.cream}}>{p.name}</div><div style={{fontSize:11,color:C.muted,marginTop:1}}>{p.desc}</div></div>
            <div style={{marginLeft:"auto",textAlign:"right"}}><div style={{fontSize:17,fontWeight:700,color:p.color}}>RD$ {p.price}</div><div style={{fontSize:9,color:C.muted}}>/semana</div></div>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
            {p.perks.map(pk=><span key={pk} style={{fontSize:10,color:C.cream,background:C.surface,border:"1px solid "+C.border,borderRadius:9,padding:"2px 7px"}}>✔ {pk}</span>)}
          </div>
          <button onClick={()=>setSel(p.id)} style={{width:"100%",padding:"10px",background:p.popular?"linear-gradient(135deg,"+C.gold+","+C.goldLt+")":C.surface,border:p.popular?"none":"1px solid "+C.border,borderRadius:7,color:p.popular?C.bg:C.cream,fontSize:13,fontWeight:700,cursor:"pointer"}}>Suscribirme →</button>
        </div>
      ))}
    </div>
  );
}

function Proceso() {
  const [active,setActive]=useState(null);
  const steps=[{e:"🌾",t:"Selección de harina",d:"Harina de trigo de alta proteína, seleccionada por su calidad."},{e:"🦠",t:"Masa madre activa",d:"Cultivo de 3 años con bacterias lácticas naturales."},{e:"⏱️",t:"12 horas de fermentación",d:"Reposo lento en frío que desarrolla sabor, aroma y textura."},{e:"🔥",t:"Horneado en horno de piedra",d:"Alta temperatura para corteza crujiente y miga abierta."},{e:"❤️",t:"Listo para ti",d:"Cada hogaza sale directo del horno a tus manos."}];
  return (
    <div style={{padding:14}}>
      <div style={{textAlign:"center",marginBottom:18}}><div style={{fontSize:34,marginBottom:7}}>⚗️</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:700,color:C.cream,marginBottom:3}}>El Proceso Artesanal</div><div style={{fontSize:12,color:C.muted}}>Paciencia, técnica y amor por el pan.</div></div>
      {steps.map((step,i)=>(
        <div key={i} onClick={()=>setActive(active===i?null:i)} style={{display:"flex",gap:12,cursor:"pointer"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
            <div style={{width:38,height:38,borderRadius:"50%",background:active===i?C.gold:C.card,border:"2px solid "+(active===i?C.gold:C.border),display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{step.e}</div>
            {i<steps.length-1&&<div style={{width:2,flex:1,minHeight:16,background:C.border,margin:"3px 0"}}/>}
          </div>
          <div style={{paddingBottom:16,flex:1}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:active===i?C.gold:C.cream,paddingTop:7}}>{step.t}</div>
            {active===i&&<div style={{fontSize:12,color:C.muted,marginTop:4,lineHeight:1.6}}>{step.d}</div>}
            {active!==i&&<div style={{fontSize:10,color:C.muted,marginTop:2}}>Toca para saber más</div>}
          </div>
        </div>
      ))}
      <div style={{background:"linear-gradient(135deg,#1C1000,#2C1800)",border:"1px solid "+C.gold+"44",borderRadius:9,padding:13,marginTop:7,textAlign:"center"}}>
        <div style={{fontSize:12,color:C.cream,lineHeight:1.6,fontStyle:"italic"}}>"No hay atajos en la fermentación lenta."</div>
        <div style={{fontSize:11,color:C.gold,marginTop:4}}>— Daury De La Rosa</div>
      </div>
    </div>
  );
}

function AdminPanel({orders,onClose}) {
  const [pw,setPw]=useState(""),[auth,setAuth]=useState(false),[filter,setFilter]=useState("todos"),[sts,setSts]=useState({});
  const ST=["pendiente","en preparación","listo","entregado"];
  const SC={pendiente:C.muted,"en preparación":C.orange,listo:"#4ACA30",entregado:C.gold};
  if(!auth) return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.97)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,padding:16}}>
      <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:11,padding:26,maxWidth:290,width:"100%",textAlign:"center"}}>
        <div style={{fontSize:34,marginBottom:9}}>🔐</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:C.cream,marginBottom:3}}>Panel Admin</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:16}}>Contraseña: <span style={{color:C.gold}}>fermento2024</span></div>
        <input type="password" placeholder="Contraseña" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(pw==="fermento2024"?setAuth(true):alert("Incorrecta"))}
          style={{width:"100%",padding:"10px",border:"1px solid "+C.border,borderRadius:7,fontFamily:"Georgia,serif",fontSize:14,background:C.surface,color:C.cream,marginBottom:9,textAlign:"center"}}/>
        <button onClick={()=>pw==="fermento2024"?setAuth(true):alert("Incorrecta")} style={{width:"100%",padding:"11px",background:C.gold,border:"none",borderRadius:7,color:C.bg,fontWeight:700,fontSize:14,cursor:"pointer",marginBottom:7}}>Entrar</button>
        <button onClick={onClose} style={{width:"100%",padding:"9px",background:"transparent",border:"1px solid "+C.border,borderRadius:7,color:C.muted,fontSize:13,cursor:"pointer"}}>Cancelar</button>
      </div>
    </div>
  );
  const rev=orders.reduce((s,o)=>s+o.total,0);
  const ic={};orders.forEach(o=>o.items.forEach(i=>{ic[i.name]=(ic[i.name]||0)+i.qty;}));
  const top=Object.entries(ic).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const filt=filter==="todos"?orders:orders.filter(o=>(sts[o.tn]||"pendiente")===filter);
  return (
    <div style={{position:"fixed",inset:0,background:C.bg,zIndex:500,overflowY:"auto"}}>
      <div style={{maxWidth:480,margin:"0 auto",padding:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,paddingTop:6}}>
          <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:700,color:C.cream}}>🔐 Panel Admin</div><div style={{fontSize:11,color:C.muted}}>Fermento Lento</div></div>
          <button onClick={onClose} style={{background:C.card,border:"1px solid "+C.border,borderRadius:7,color:C.muted,fontSize:12,padding:"6px 11px",cursor:"pointer"}}>✕ Cerrar</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:12}}>
          {[{l:"Pedidos",v:orders.length,i:"📦"},{l:"Ingresos",v:"RD$"+rev,i:"💰"},{l:"Hogazas",v:orders.reduce((s,o)=>s+o.items.reduce((ss,i)=>ss+i.qty,0),0),i:"🍞"}].map(s=>(
            <div key={s.l} style={{background:C.card,border:"1px solid "+C.border,borderRadius:9,padding:"10px 7px",textAlign:"center"}}>
              <div style={{fontSize:17,marginBottom:3}}>{s.i}</div>
              <div style={{fontSize:s.l==="Ingresos"?10:16,fontWeight:700,color:C.gold,lineHeight:1}}>{s.v}</div>
              <div style={{fontSize:9,color:C.muted,marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
        {top.length>0&&<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:9,padding:"10px 12px",marginBottom:12}}>
          <div style={{fontSize:10,color:C.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>🏆 Más pedidos</div>
          {top.map(([n,c],i)=><div key={n} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:i<top.length-1?"1px solid "+C.border:"none",fontSize:12}}><span style={{color:C.cream}}>{["🥇","🥈","🥉"][i]} {n}</span><span style={{color:C.gold,fontWeight:700}}>{c} uds</span></div>)}
        </div>}
        <div style={{display:"flex",gap:5,marginBottom:9,overflowX:"auto"}}>
          {["todos",...ST].map(s=><button key={s} onClick={()=>setFilter(s)} style={{padding:"4px 10px",borderRadius:14,border:"1px solid "+(filter===s?C.gold:C.border),background:filter===s?C.gold+"22":"transparent",color:filter===s?C.gold:C.muted,fontSize:10,cursor:"pointer",whiteSpace:"nowrap"}}>{s}</button>)}
        </div>
        {filt.length===0?<div style={{textAlign:"center",padding:"24px",color:C.muted,fontSize:13}}>Sin pedidos</div>:filt.map(o=>(
          <div key={o.tn} style={{background:C.card,border:"1px solid "+C.border,borderRadius:9,overflow:"hidden",marginBottom:9}}>
            <div style={{background:C.surface,padding:"8px 11px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:11,color:C.cream,fontWeight:700}}>#{o.tn} · {o.name}</div><div style={{fontSize:10,color:C.muted}}>{o.date}</div></div>
              <div style={{fontSize:13,fontWeight:700,color:C.gold}}>RD$ {o.total}</div>
            </div>
            <div style={{padding:"7px 11px"}}>
              {o.items.map((it,i)=><div key={i} style={{fontSize:11,color:C.cream,padding:"1px 0"}}>{it.emoji} {it.qty}× {it.name}</div>)}
              {o.phone&&<div style={{fontSize:10,color:C.muted,marginTop:2}}>📱 {o.phone}</div>}
            </div>
            <div style={{padding:"0 11px 9px"}}>
              <div style={{fontSize:9,color:C.muted,marginBottom:4}}>Estado:</div>
              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                {ST.map(s=><button key={s} onClick={()=>setSts(ss=>({...ss,[o.tn]:s}))} style={{padding:"3px 8px",borderRadius:10,border:"1px solid "+((sts[o.tn]||"pendiente")===s?SC[s]:C.border),background:(sts[o.tn]||"pendiente")===s?SC[s]+"22":"transparent",color:(sts[o.tn]||"pendiente")===s?SC[s]:C.muted,fontSize:9,cursor:"pointer"}}>{s}</button>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistView({history,onRepeat}) {
  if(!history.length) return <div style={{textAlign:"center",padding:"44px 16px",color:C.muted}}><div style={{fontSize:44,marginBottom:10}}>📜</div><div style={{fontSize:15,fontFamily:"'Playfair Display',serif",color:C.cream,marginBottom:5}}>Sin pedidos aún</div><div style={{fontSize:12}}>Aquí verás tu historial</div></div>;
  return (
    <div style={{padding:14}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:700,color:C.cream,marginBottom:12}}>📜 Historial</div>
      {history.map((o,i)=>(
        <div key={i} style={{background:C.card,border:"1px solid "+C.border,borderRadius:9,overflow:"hidden",marginBottom:9}}>
          <div style={{background:C.surface,padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:11,color:C.muted}}>#{o.tn}</div><div style={{fontSize:10,color:C.muted,marginTop:1}}>{o.date}</div></div>
            <div style={{fontSize:14,fontWeight:700,color:C.gold}}>RD$ {o.total}</div>
          </div>
          <div style={{padding:"8px 12px"}}>
            {o.items.map((it,j)=><div key={j} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.cream,padding:"2px 0"}}><span>{it.emoji} {it.qty}× {it.name}</span><span style={{color:C.muted}}>RD$ {it.price*it.qty}</span></div>)}
          </div>
          <div style={{padding:"0 12px 10px"}}><button onClick={()=>onRepeat(o.items)} style={{width:"100%",padding:"8px",background:"transparent",border:"1px solid "+C.gold+"66",borderRadius:7,color:C.gold,fontSize:12,fontWeight:700,cursor:"pointer"}}>🔁 Repetir este pedido</button></div>
        </div>
      ))}
    </div>
  );
}

function Ticket({order,onClose,onNew,onSaved}) {
  const now=new Date();
  const ds=now.toLocaleDateString("es-DO",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const ts=now.toLocaleTimeString("es-DO",{hour:"2-digit",minute:"2-digit"});
  const tn=String(Math.floor(Math.random()*9000+1000));
  const total=order.total||order.items.reduce((s,i)=>s+i.price*i.qty,0);
  useEffect(()=>{hist.unshift({tn,date:ds+" · "+ts,items:order.items,total,name:order.name,phone:order.phone,delivery:order.delivery});onSaved&&onSaved();},[]);
  const lines=["🍞 *Pedido Fermento Lento*","━━━━━━━━━━","Ticket #"+tn,"📅 "+ds,"","*Cliente:* "+order.name];
  if(order.phone)lines.push("📱 "+order.phone);
  if(order.delivery)lines.push("📅 Entrega: "+order.delivery);
  lines.push("","*Pedido:*");
  order.items.forEach(i=>lines.push(" • "+i.qty+"x "+i.name+" — RD$ "+i.price*i.qty));
  lines.push("━━━━━━━━━━","*TOTAL: RD$ "+total+"*");
  if(order.notes)lines.push("","📝 "+order.notes);
  const wa="https://wa.me/18296286471?text="+encodeURIComponent(lines.join("\n"));
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,padding:14,overflowY:"auto"}}>
      <div style={{background:"#F8F2E8",maxWidth:360,width:"100%",borderRadius:8,boxShadow:"0 20px 70px rgba(0,0,0,0.8)",overflow:"hidden",fontFamily:"Georgia,serif",margin:"auto"}}>
        <div style={{background:C.bg,padding:"18px",textAlign:"center",borderBottom:"2px solid "+C.gold}}>
          <div style={{fontSize:38,marginBottom:5}}>🍞</div>
          <div style={{fontSize:15,fontWeight:700,color:C.cream,letterSpacing:3}}>FERMENTO LENTO</div>
          <div style={{fontSize:9,color:C.gold,letterSpacing:4,marginTop:1}}>PANADERÍA ARTESANAL</div>
          <div style={{marginTop:11,display:"flex",justifyContent:"center",gap:18,alignItems:"center"}}>
            <div><div style={{fontSize:9,color:C.muted,letterSpacing:2}}>TICKET</div><div style={{fontSize:17,fontWeight:700,color:C.gold,lineHeight:1}}>#{tn}</div></div>
            <div style={{width:1,height:28,background:C.border}}/>
            <div style={{textAlign:"left"}}><div style={{fontSize:10,color:C.muted}}>{ds}</div><div style={{fontSize:11,color:C.cream,fontWeight:600}}>{ts} hrs</div></div>
          </div>
        </div>
        <div style={{height:7,background:"repeating-linear-gradient(90deg,#F8F2E8 0,#F8F2E8 12px,"+C.bg+" 12px,"+C.bg+" 24px)"}}/>
        <div style={{padding:"10px 16px 8px",borderBottom:"1px dashed #C8B090"}}>
          <div style={{fontSize:9,color:"#9A8060",letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>— Cliente —</div>
          <div style={{fontSize:14,fontWeight:700,color:"#2A1800",marginBottom:2}}>👤 {order.name}</div>
          {order.phone&&<div style={{fontSize:12,color:"#5A3A18",marginBottom:1}}>📱 {order.phone}</div>}
          {order.delivery&&<div style={{fontSize:12,color:"#5A3A18"}}>📅 Entrega: {order.delivery}</div>}
          {order.notes&&<div style={{fontSize:11,color:"#7A5A38",marginTop:4,background:"#EDE0C8",borderRadius:4,padding:"4px 8px",fontStyle:"italic"}}>📝 {order.notes}</div>}
        </div>
        <div style={{margin:"6px 16px",background:"#FFF3D0",border:"1px solid #C8860A",borderRadius:5,padding:"5px 9px",fontSize:11,color:"#7A4A00"}}>⏱️ <strong>Mínimo 48 horas de antelación</strong></div>
        {order.discountInfo&&<div style={{margin:"0 16px 4px",background:"#0A2A0A",border:"1px solid #2A6A20",borderRadius:5,padding:"5px 9px",fontSize:11,color:"#6ACA50"}}>🎟️ Descuento {order.discountInfo.code}: −{order.discountInfo.pct}%</div>}
        <div style={{padding:"3px 16px 6px"}}>
          <div style={{fontSize:9,color:"#9A8060",letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>— Detalle —</div>
          {order.items.map((it,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"3px 0",color:"#2A1800",borderBottom:i<order.items.length-1?"1px dotted #D5C0A0":"none"}}>
              <span>{it.emoji} {it.qty}× {it.name}</span><span style={{fontWeight:700}}>RD$ {it.price*it.qty}</span>
            </div>
          ))}
        </div>
        <div style={{margin:"0 16px",borderTop:"2px solid #C8B090",paddingTop:8,paddingBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:19,fontWeight:700,color:"#2A1800"}}><span>TOTAL</span><span style={{color:C.orange}}>RD$ {total}</span></div>
        </div>
        <div style={{textAlign:"center",borderTop:"2px dashed #C8B090",paddingTop:8,paddingBottom:3}}>
          <div style={{fontSize:10,color:"#9A8060"}}>12 horas de fermentación lenta · Hecho con dedicación</div>
          <div style={{fontSize:10,fontStyle:"italic",color:"#B8A080",marginTop:1}}>by Daury De La Rosa 🌾</div>
        </div>
        <div style={{padding:"8px 12px 4px"}}>
          <a href={wa} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,width:"100%",padding:"11px",background:"#25D366",borderRadius:6,color:"#fff",fontFamily:"Georgia,serif",fontSize:13,fontWeight:700,textDecoration:"none"}}>📲 Enviar por WhatsApp</a>
        </div>
        <div style={{display:"flex",gap:7,padding:"6px 12px 12px"}}>
          <button onClick={onNew} style={{flex:1,padding:"10px",background:C.gold,color:C.bg,border:"none",borderRadius:6,fontFamily:"Georgia,serif",fontSize:12,fontWeight:700,cursor:"pointer"}}>🍞 Nuevo Pedido</button>
          <button onClick={onClose} style={{flex:1,padding:"10px",background:"transparent",color:"#5A3A18",border:"2px solid #C8B090",borderRadius:6,fontFamily:"Georgia,serif",fontSize:12,fontWeight:700,cursor:"pointer"}}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cart,setCart]=useState({});
  const [tab,setTab]=useState("menu");
  const [cat,setCat]=useState("Todos");
  const [search,setSearch]=useState("");
  const [form,setForm]=useState({name:"",phone:"",notes:"",delivery:"",dc:""});
  const [dcInfo,setDcInfo]=useState(null);
  const [dcErr,setDcErr]=useState("");
  const [done,setDone]=useState(null);
  const [detail,setDetail]=useState(null);
  const [favs,setFavs]=useState([]);
  const [history,setHistory]=useState([]);
  const [admin,setAdmin]=useState(false);
  const [comboAdded,setComboAdded]=useState({});

  const totalQ=Object.values(cart).reduce((a,b)=>a+b,0);
  const sub=Object.entries(cart).reduce((s,[id,q])=>{const it=findItem(id);return s+(it?it.price*q:0);},0);
  const dcAmt=dcInfo?Math.round(sub*dcInfo.pct/100):0;
  const total=sub-dcAmt;
  const cartItems=Object.entries(cart).filter(([,q])=>q>0).map(([id,q])=>({...findItem(id),qty:q}));

  const add=id=>{pop[id]=(pop[id]||0)+1;setCart(c=>({...c,[id]:(c[id]||0)+1}));};
  const del=id=>setCart(c=>{if((c[id]||0)<=1){const n={...c};delete n[id];return n;}return{...c,[id]:c[id]-1};});
  const toggleFav=id=>setFavs(f=>f.includes(id)?f.filter(x=>x!==id):[...f,id]);
  const applyDc=()=>{const code=form.dc.toUpperCase().trim();if(DISC[code]){setDcInfo({code,pct:DISC[code]});setDcErr("");}else{setDcErr("Código inválido");setDcInfo(null);}};
  const submit=()=>{if(!form.name.trim())return alert("Ingresa tu nombre.");if(!cartItems.length)return alert("Carrito vacío.");setDone({...form,items:cartItems,discountInfo:dcInfo,total});};
  const reset=()=>{setCart({});setForm({name:"",phone:"",notes:"",delivery:"",dc:""});setDcInfo(null);setDcErr("");setDone(null);setTab("menu");setHistory([...hist]);};
  const repeat=items=>{const nc={};items.forEach(i=>{nc[i.id]=(nc[i.id]||0)+i.qty;});setCart(nc);setTab("cart");};

  const cats=["Todos","❤️ Favoritos","Salada Clásica","Gourmet","Dulce"];
  const base=cat==="❤️ Favoritos"?ITEMS.filter(i=>favs.includes(i.id)):cat==="Todos"?ITEMS:ITEMS.filter(i=>i.cat===cat);
  const shown=search?ITEMS.filter(i=>i.name.toLowerCase().includes(search.toLowerCase())):base;

  const now=new Date(),day=now.getDay(),h=now.getHours();
  const hrs={1:[8,18],2:[8,18],3:[8,18],4:[8,18],5:[8,18],6:[8,16],0:null}[day];
  const open=hrs&&h>=hrs[0]&&h<hrs[1];

  const TABS=[{k:"menu",l:"🍞 Menú"},{k:"quiz",l:"✨ ¿Cuál es el mío?"},{k:"mes",l:"🌟 Pan del Mes"},{k:"mem",l:"📦 Membresía"},{k:"proc",l:"⚗️ Cómo se hace"},{k:"cart",l:"🛒"+(totalQ>0?" "+totalQ:"")},{k:"quote",l:"📋 Cotizar"},{k:"hist",l:"📜 Historial"}];

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"Georgia,serif",color:C.text}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');*{box-sizing:border-box;margin:0;padding:0}@keyframes slideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.ic:hover{background:#321D0C!important}button:active{opacity:.85}input:focus,textarea:focus,select:focus{outline:2px solid #C8960A}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#3D2510}select option{background:#2C1A0A;color:#F0DEB8}`}</style>

      {/* HEADER */}
      <div style={{background:"linear-gradient(180deg,#060300 0%,#1A0F06 100%)",borderBottom:"2px solid "+C.gold,padding:"22px 18px 0",textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:90,height:90,borderRadius:"50%",background:"linear-gradient(135deg,"+C.goldLt+","+C.gold+",#7A5000,"+C.goldLt+")",padding:3,boxShadow:"0 0 30px rgba(200,150,10,0.25)",marginBottom:10}}>
          <div style={{width:"100%",height:"100%",borderRadius:"50%",background:C.surface,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40}}>🍞</div>
        </div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:900,color:C.cream,letterSpacing:4,textTransform:"uppercase",lineHeight:1}}>FERMENTO LENTO</div>
        <div style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center",margin:"5px 28px 0"}}>
          <div style={{flex:1,height:1,background:"linear-gradient(to right,transparent,"+C.gold+")"}}/>
          <div style={{fontSize:9,color:C.gold,letterSpacing:4,whiteSpace:"nowrap"}}>PANADERÍA ARTESANAL</div>
          <div style={{flex:1,height:1,background:"linear-gradient(to left,transparent,"+C.gold+")"}}/>
        </div>
        <div style={{marginTop:7,display:"inline-flex",alignItems:"center",gap:5,background:open?"#0A2A0A":"#2A0A0A",border:"1px solid "+(open?"#2A6A20":"#C03020"),borderRadius:18,padding:"3px 11px",fontSize:10}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:open?"#4ACA30":"#C03020"}}/>
          <span style={{color:open?"#8ADA60":"#E06050",fontWeight:700}}>{open?"Abierto ahora":"Cerrado"}</span>
          {!open&&hrs&&<span style={{color:C.muted}}>· Abre {hrs[0]}:00</span>}
        </div>
        <div style={{display:"flex",gap:6,overflowX:"auto",padding:"12px 4px 13px",justifyContent:"flex-start"}}>
          {TABS.map(t=><button key={t.k} onClick={()=>setTab(t.k)} style={{padding:"7px 12px",borderRadius:20,flexShrink:0,border:"2px solid "+(tab===t.k?C.gold:C.border),background:tab===t.k?C.gold+"22":"rgba(10,6,2,0.6)",color:tab===t.k?C.gold:C.muted,fontSize:11,fontFamily:"Georgia,serif",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>{t.l}</button>)}
        </div>
      </div>
      <div style={{height:1,background:"linear-gradient(to right,transparent,"+C.gold+",transparent)"}}/>

      <div style={{maxWidth:480,margin:"0 auto",paddingBottom:24}}>

        {/* MENU */}
        {tab==="menu"&&(
          <div style={{animation:"fadeIn .25s ease"}}>
            {/* Search */}
            <div style={{padding:"10px 12px 0",position:"relative"}}>
              <span style={{position:"absolute",top:"50%",left:23,transform:"translateY(-30%)",fontSize:14,color:C.muted,pointerEvents:"none"}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar pan..." style={{width:"100%",padding:"9px 30px 9px 32px",border:"1px solid "+C.border,borderRadius:22,fontFamily:"Georgia,serif",fontSize:13,background:C.card,color:C.cream}}/>
              {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:19,top:"50%",transform:"translateY(-30%)",background:"none",border:"none",color:C.muted,fontSize:17,cursor:"pointer"}}>×</button>}
            </div>
            {!search&&<div style={{display:"flex",gap:6,padding:"9px 12px",overflowX:"auto",borderBottom:"1px solid "+C.border,background:C.surface}}>
              {cats.map(c=><button key={c} onClick={()=>setCat(c)} style={{padding:"5px 12px",borderRadius:18,border:"1px solid "+(cat===c?C.gold:C.border),background:cat===c?C.card:"transparent",color:cat===c?C.gold:C.muted,fontSize:11,fontFamily:"Georgia,serif",fontWeight:cat===c?700:400,cursor:"pointer",whiteSpace:"nowrap"}}>{c}</button>)}
            </div>}
            {search&&<div style={{padding:"6px 15px",fontSize:11,color:C.muted}}>{shown.length} resultado{shown.length!==1?"s":""} para "{search}"</div>}
            {/* Combos */}
            {!search&&<div style={{margin:"10px 12px 0"}}>
              <div style={{fontSize:9,color:C.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>🎁 Combos — Ahorra más</div>
              {COMBOS.map(combo=>{
                const its=combo.ids.map(findItem).filter(Boolean);
                const orig=its.reduce((s,i)=>s+i.price,0);
                const disc=Math.round(orig*(1-combo.pct/100));
                return (
                  <div key={combo.id} style={{background:C.card,border:"1px solid "+C.border,borderRadius:9,padding:"10px 11px",marginBottom:7,display:"flex",alignItems:"center",gap:9}}>
                    <div style={{fontSize:22,flexShrink:0}}>{combo.emoji}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:C.cream}}>{combo.name}</div>
                      <div style={{fontSize:10,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{combo.desc}</div>
                      <div style={{display:"flex",alignItems:"center",gap:5,marginTop:2}}>
                        <span style={{fontSize:13,fontWeight:700,color:C.gold}}>RD$ {disc}</span>
                        <span style={{fontSize:10,color:C.muted,textDecoration:"line-through"}}>RD$ {orig}</span>
                        <span style={{fontSize:9,background:"#8B0000",color:"#fff",padding:"2px 5px",borderRadius:7,fontWeight:700}}>-{combo.pct}%</span>
                      </div>
                    </div>
                    <button onClick={()=>{combo.ids.forEach(id=>add(id));setComboAdded(a=>({...a,[combo.id]:true}));}} style={{flexShrink:0,padding:"7px 9px",background:comboAdded[combo.id]?"#1A3A10":C.gold,border:comboAdded[combo.id]?"1px solid #4ACA30":"none",borderRadius:7,color:comboAdded[combo.id]?"#8ADA60":C.bg,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                      {comboAdded[combo.id]?"✓":"+ Combo"}
                    </button>
                  </div>
                );
              })}
            </div>}
            {/* Items */}
            <div style={{padding:"9px 12px 0"}}>
              {shown.length===0?<div style={{textAlign:"center",padding:"26px",color:C.muted}}><div style={{fontSize:34,marginBottom:7}}>🔍</div><div style={{fontSize:13,color:C.cream}}>Sin resultados para "{search}"</div></div>
              :shown.map(item=>{
                const qty=cart[item.id]||0,isFav=favs.includes(item.id);
                return (
                  <div key={item.id} className="ic" style={{position:"relative",display:"flex",alignItems:"center",padding:"12px",marginBottom:7,background:qty>0?C.cardHov:C.card,borderRadius:9,border:"1px solid "+(qty>0?C.gold+"66":C.border),transition:"background .15s"}}>
                    <PopBadge itemId={item.id}/>
                    <button onClick={()=>toggleFav(item.id)} style={{position:"absolute",bottom:6,right:qty>0?84:42,background:"none",border:"none",fontSize:12,cursor:"pointer",opacity:isFav?1:0.25,padding:0}}>❤️</button>
                    <div onClick={()=>setDetail(item)} style={{display:"flex",alignItems:"center",flex:1,minWidth:0,cursor:"pointer"}}>
                      <div style={{fontSize:30,marginRight:10,width:38,textAlign:"center",flexShrink:0}}>{item.emoji}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:C.cream}}>{item.name}</div>
                        <div style={{fontSize:11,color:C.muted,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.sub}</div>
                        <div style={{display:"flex",alignItems:"center",gap:5,marginTop:2}}>
                          <span style={{fontSize:13,fontWeight:700,color:C.gold}}>{item.price} RD$</span>
                          <span style={{fontSize:9,color:C.muted,border:"1px solid "+C.border,borderRadius:7,padding:"1px 5px"}}>Ver más →</span>
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0,marginLeft:6}}>
                      {qty>0&&<><button onClick={()=>del(item.id)} style={{width:28,height:28,borderRadius:"50%",border:"1px solid "+C.border,background:C.surface,color:C.cream,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button><span style={{fontWeight:700,color:C.gold,minWidth:12,textAlign:"center",fontSize:14}}>{qty}</span></>}
                      <button onClick={()=>add(item.id)} style={{width:32,height:32,borderRadius:"50%",border:"none",background:C.gold,color:C.bg,fontSize:19,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="quiz"&&<QuizView onAdd={add}/>}
        {tab==="mes"&&<PanMes onAdd={add}/>}
        {tab==="mem"&&<Membresia/>}
        {tab==="proc"&&<Proceso/>}
        {tab==="hist"&&<HistView history={history} onRepeat={repeat}/>}

        {/* CART */}
        {tab==="cart"&&(
          <div style={{padding:14,animation:"fadeIn .25s ease"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:C.cream,marginBottom:13}}>🛒 Tu Pedido</div>
            {cartItems.length===0?<div style={{textAlign:"center",padding:"44px 16px",color:C.muted}}><div style={{fontSize:44,marginBottom:11}}>🍞</div><div style={{fontSize:15,fontFamily:"'Playfair Display',serif",color:C.cream,marginBottom:5}}>Tu carrito está vacío</div><button onClick={()=>setTab("menu")} style={{marginTop:13,padding:"9px 22px",background:C.gold,border:"none",borderRadius:18,color:C.bg,fontSize:13,fontWeight:700,cursor:"pointer"}}>Ver Menú →</button></div>
            :<>
              <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:9,overflow:"hidden",marginBottom:11}}>
                {cartItems.map((it,i)=>(
                  <div key={it.id} style={{display:"flex",alignItems:"center",padding:"10px 12px",borderBottom:i<cartItems.length-1?"1px solid "+C.border:"none"}}>
                    <span style={{fontSize:22,marginRight:9}}>{it.emoji}</span>
                    <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:C.cream}}>{it.name}</div><div style={{fontSize:10,color:C.muted,marginTop:1}}>RD$ {it.price} c/u</div></div>
                    <div style={{display:"flex",alignItems:"center",gap:5}}>
                      <button onClick={()=>del(it.id)} style={{width:24,height:24,border:"1px solid "+C.border,borderRadius:"50%",background:C.surface,cursor:"pointer",fontSize:14,color:C.cream,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{fontWeight:700,color:C.gold,minWidth:12,textAlign:"center",fontSize:13}}>{it.qty}</span>
                      <button onClick={()=>add(it.id)} style={{width:24,height:24,border:"none",borderRadius:"50%",background:C.gold,cursor:"pointer",fontSize:14,color:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                    </div>
                    <div style={{minWidth:68,textAlign:"right",fontWeight:700,color:C.cream,fontSize:12,marginLeft:6}}>RD$ {it.price*it.qty}</div>
                  </div>
                ))}
              </div>
              {/* Discount */}
              <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:9,padding:"11px 12px",marginBottom:11}}>
                <div style={{fontSize:10,color:C.muted,letterSpacing:1,marginBottom:6}}>🎟️ CÓDIGO DE DESCUENTO</div>
                <div style={{display:"flex",gap:6}}>
                  <input value={form.dc} onChange={e=>setForm(f=>({...f,dc:e.target.value}))} placeholder="Ej: INSTAGRAM15" onKeyDown={e=>e.key==="Enter"&&applyDc()} style={{flex:1,padding:"8px 10px",border:"1px solid "+(dcInfo?"#2A6A20":dcErr?"#C03020":C.border),borderRadius:6,fontFamily:"Georgia,serif",fontSize:12,background:C.surface,color:C.cream,textTransform:"uppercase"}}/>
                  <button onClick={applyDc} style={{padding:"8px 11px",background:dcInfo?"#2A6A20":C.gold,border:"none",borderRadius:6,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>{dcInfo?"✓":"Aplicar"}</button>
                </div>
                {dcErr&&<div style={{fontSize:10,color:"#C03020",marginTop:3}}>⚠️ {dcErr}</div>}
                {dcInfo&&<div style={{fontSize:10,color:"#6ACA50",marginTop:3}}>✓ {dcInfo.pct}% de descuento — ahorras RD$ {dcAmt}</div>}
              </div>
              {/* Total */}
              <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:9,padding:"10px 12px",marginBottom:11}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.muted,marginBottom:3}}><span>Subtotal</span><span>RD$ {sub}</span></div>
                {dcInfo&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#6ACA50",marginBottom:3}}><span>Descuento ({dcInfo.pct}%)</span><span>− RD$ {dcAmt}</span></div>}
                <div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:700,color:C.cream,borderTop:"1px solid "+C.border,paddingTop:6,marginTop:3}}><span>TOTAL</span><span style={{color:C.gold}}>RD$ {total}</span></div>
              </div>
              {/* Form */}
              <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:9,overflow:"hidden",marginBottom:11}}>
                <div style={{background:C.surface,padding:"8px 12px",fontSize:10,color:C.muted,letterSpacing:1}}>👤 TUS DATOS</div>
                <div style={{padding:12,display:"flex",flexDirection:"column",gap:9}}>
                  {[{label:"Nombre completo *",key:"name",type:"text",ph:"Tu nombre",icon:"👤"},{label:"Teléfono / WhatsApp",key:"phone",type:"tel",ph:"829-628-6471",icon:"📱"},{label:"Fecha de entrega",key:"delivery",type:"date",ph:"",icon:"📅"}].map(f=>(
                    <div key={f.key}>
                      <label style={{fontSize:10,color:C.muted,display:"block",marginBottom:3}}>{f.icon} {f.label}</label>
                      <input type={f.type} value={form[f.key]} placeholder={f.ph} onChange={e=>setForm(fm=>({...fm,[f.key]:e.target.value}))} style={{width:"100%",padding:"9px 10px",border:"1px solid "+C.border,borderRadius:6,fontFamily:"Georgia,serif",fontSize:13,background:C.surface,color:C.cream}}/>
                    </div>
                  ))}
                  <div>
                    <label style={{fontSize:10,color:C.muted,display:"block",marginBottom:3}}>📝 Notas especiales</label>
                    <textarea value={form.notes} placeholder="Alergias, instrucciones..." onChange={e=>setForm(fm=>({...fm,notes:e.target.value}))} rows={2} style={{width:"100%",padding:"9px 10px",border:"1px solid "+C.border,borderRadius:6,fontFamily:"Georgia,serif",fontSize:13,background:C.surface,color:C.cream,resize:"none"}}/>
                  </div>
                </div>
              </div>
              <div style={{background:"#1C1000",border:"1px solid "+C.gold+"66",borderRadius:7,padding:"7px 11px",display:"flex",alignItems:"center",gap:6,marginBottom:11,fontSize:11,color:C.gold}}>⏱️ <span>Pedidos con <strong>mínimo 48 horas</strong> de antelación</span></div>
              <button onClick={submit} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,"+C.gold+","+C.goldLt+")",color:C.bg,border:"none",borderRadius:8,fontFamily:"Georgia,serif",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 5px 20px "+C.gold+"44"}}>✓ Confirmar Pedido</button>
            </>}
          </div>
        )}

        {/* QUOTE */}
        {tab==="quote"&&(
          <div style={{padding:"0 14px 22px",animation:"fadeIn .25s ease"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:C.cream,margin:"14px 0 4px"}}>📋 Cotización</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:13}}>Hogazas de Masa Madre · Artesanales</div>
            {/* Freshness */}
            <FCalc/>
            <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:9,overflow:"hidden",marginBottom:11}}>
              <div style={{background:C.surface,padding:"8px 12px",fontSize:10,color:C.muted,letterSpacing:2,textTransform:"uppercase"}}>🛒 Resumen</div>
              <div style={{padding:"3px 12px 8px"}}>
                {cartItems.length===0?<div style={{padding:"13px 0",textAlign:"center",color:C.muted,fontSize:12}}>Agrega productos para cotizar</div>
                :cartItems.map((it,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<cartItems.length-1?"1px solid "+C.border:"none"}}>
                    <div><div style={{fontSize:13,fontWeight:700,color:C.cream}}>{it.emoji} {it.name}</div><div style={{fontSize:11,color:C.muted,marginTop:1}}>{it.qty} × RD$ {it.price}</div></div>
                    <div style={{fontWeight:700,color:C.gold,fontSize:14}}>RD$ {it.price*it.qty}</div>
                  </div>
                ))}
              </div>
            </div>
            {cartItems.length>0&&<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:9,padding:13,marginBottom:13}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:18,fontWeight:700,color:C.cream}}>TOTAL</span><span style={{fontSize:18,fontWeight:700,color:C.gold}}>RD$ {sub}</span></div></div>}
            <div style={{background:"#1C1000",border:"1px solid "+C.gold+"66",borderRadius:7,padding:11}}>
              <div style={{fontSize:11,fontWeight:700,color:C.gold,marginBottom:6}}>⏱️ Condiciones</div>
              {["Mínimo 48 horas de antelación","Pedidos por encargo exclusivamente","12 horas de fermentación lenta"].map(t=><div key={t} style={{fontSize:11,color:C.muted,marginBottom:3}}>✔ {t}</div>)}
            </div>
          </div>
        )}

      </div>

      {/* Admin FAB */}
      <button onClick={()=>setAdmin(true)} style={{position:"fixed",bottom:14,right:14,zIndex:100,background:C.surface,border:"1px solid "+C.border,borderRadius:"50%",width:38,height:38,color:C.muted,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 10px rgba(0,0,0,0.5)"}}>⚙️</button>

      {detail&&<ItemModal item={detail} qty={cart[detail.id]||0} onAdd={()=>add(detail.id)} onDel={()=>del(detail.id)} onClose={()=>setDetail(null)} isFav={favs.includes(detail.id)} onFav={()=>toggleFav(detail.id)}/>}
      {done&&<Ticket order={done} onClose={()=>setDone(null)} onNew={reset} onSaved={()=>setHistory([...hist])}/>}
      {admin&&<AdminPanel orders={hist} onClose={()=>setAdmin(false)}/>}
    </div>
  );
}

function FCalc() {
  const [d,setD]=useState("");
  const ready=d?(()=>{const x=new Date(d+"T00:00:00");x.setDate(x.getDate()+2);return x.toLocaleDateString("es-DO",{weekday:"long",day:"numeric",month:"long"});})():null;
  return (
    <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:9,padding:13,marginBottom:13}}>
      <div style={{fontSize:10,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:7}}>🧮 Calculadora de frescura</div>
      <div style={{fontSize:12,color:C.cream,marginBottom:7}}>¿Cuándo quieres pedir? Tu pan estará listo en 48h.</div>
      <input type="date" value={d} onChange={e=>setD(e.target.value)} style={{width:"100%",padding:"9px 11px",border:"1px solid "+C.border,borderRadius:6,fontFamily:"Georgia,serif",fontSize:13,background:C.surface,color:C.cream}}/>
      {ready&&<div style={{background:"#1C1000",border:"1px solid "+C.gold+"88",borderRadius:7,padding:"9px 11px",display:"flex",alignItems:"center",gap:9,marginTop:7}}><span style={{fontSize:18}}>🍞</span><div><div style={{fontSize:10,color:C.muted}}>Tu hogaza estará lista el</div><div style={{fontSize:14,fontWeight:700,color:C.gold,textTransform:"capitalize"}}>{ready}</div></div></div>}
    </div>
  );
}
