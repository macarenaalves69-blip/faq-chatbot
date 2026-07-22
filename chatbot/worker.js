var HTML_PAGE = '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Mesa de Entrada y Salida - FAQ</title><style>*{margin:0;padding:0;box-sizing:border-box}:root{--bg:#0a0a0f;--surface:#12121a;--border:#1e1e2e;--text:#e0e0e8;--text-dim:#6e6e80;--accent:#6c5ce7;--user-bg:#6c5ce7;--bot-bg:#1a1a2e}html,body{height:100%;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--text)}#app{display:flex;flex-direction:column;height:100vh;max-width:680px;margin:0 auto}header{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;background:rgba(10,10,15,.95);position:sticky;top:0;z-index:10}header .dot{width:10px;height:10px;border-radius:50%;background:#00d26a;box-shadow:0 0 8px #00d26a}header h1{font-size:16px;font-weight:600}header span{font-size:12px;color:var(--text-dim)}#messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:16px}.msg{display:flex;gap:10px;max-width:88%;animation:fadeUp .3s ease}.msg.user{align-self:flex-end;flex-direction:row-reverse}.msg.bot{align-self:flex-start}.avatar{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}.msg.user .avatar{background:var(--user-bg);color:#fff}.msg.bot .avatar{background:#1e1e2e;color:var(--accent)}.bubble{padding:12px 16px;border-radius:18px;font-size:14px;line-height:1.6;word-break:break-word}.msg.user .bubble{background:var(--user-bg);color:#fff;border-bottom-right-radius:4px}.msg.bot .bubble{background:var(--bot-bg);border:1px solid var(--border);border-bottom-left-radius:4px}.bubble p{margin:0 0 8px}.bubble p:last-child{margin-bottom:0}.bubble code{background:rgba(108,92,231,.15);padding:2px 6px;border-radius:4px;font-size:13px}.bubble pre{background:#0d0d14;padding:12px;border-radius:8px;overflow-x:auto;margin:8px 0;font-size:13px;line-height:1.5}.bubble pre code{background:none;padding:0}.typing{display:flex;gap:4px;padding:4px 0}.typing span{width:6px;height:6px;border-radius:50%;background:var(--text-dim);animation:bounce .6s infinite alternate}.typing span:nth-child(2){animation-delay:.2s}.typing span:nth-child(3){animation-delay:.4s}@keyframes bounce{to{opacity:.3;transform:translateY(-4px)}}@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}#input-area{padding:12px 16px;border-top:1px solid var(--border);background:rgba(10,10,15,.95)}#input-wrap{display:flex;gap:8px;align-items:flex-end;background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:6px 6px 6px 18px;transition:border-color .2s}#input-wrap:focus-within{border-color:var(--accent)}#msg-input{flex:1;background:none;border:none;outline:none;color:var(--text);font-size:14px;line-height:1.5;resize:none;max-height:120px;font-family:inherit;padding:8px 0}#msg-input::placeholder{color:var(--text-dim)}#send-btn{width:38px;height:38px;border-radius:50%;border:none;background:var(--accent);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s,opacity .15s;flex-shrink:0}#send-btn:hover{transform:scale(1.05)}#send-btn:active{transform:scale(.95)}#send-btn:disabled{opacity:.3;cursor:default;transform:none}#send-btn svg{width:18px;height:18px}#audio-controls{padding:8px 20px 16px;display:flex;justify-content:flex-start}#audio-controls audio{height:36px;border-radius:18px;filter:hue-rotate(230deg)}</style></head><body><div id="app"><header><div class="dot"></div><div><h1>FAQ Bot</h1><span>Mesa de Entrada y Salida</span></div></header><div id="messages"><div class="msg bot"><div class="avatar">AI</div><div class="bubble"><p>Hola! Soy el asistente del area de Mesa de Entrada y Salida. Preguntame sobre procedimientos, requisitos y consultas del manual de FAQ.</p></div></div></div><div id="input-area"><div id="input-wrap"><textarea id="msg-input" rows="1" placeholder="Escribe tu mensaje..."></textarea><button id="send-btn" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div></div></div><script>var msgEl=document.getElementById("messages"),inputEl=document.getElementById("msg-input"),sendBtn=document.getElementById("send-btn");var conversation=[{role:"system",content:"Sos un asistente AI experto del area de Mesa de Entrada y Salida. Responde basandote en el manual de FAQ."}],sending=false;inputEl.addEventListener("input",function(){inputEl.style.height="auto";inputEl.style.height=Math.min(inputEl.scrollHeight,120)+"px";sendBtn.disabled=!inputEl.value.trim()||sending});inputEl.addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}});sendBtn.addEventListener("click",send);function addMsg(role,content){var div=document.createElement("div");div.className="msg "+(role==="user"?"user":"bot");div.innerHTML=(role==="user"?"<div class=\\"avatar\\">V</div>":"<div class=\\"avatar\\">AI</div>")+"<div class=\\"bubble\\">"+content+"</div>";msgEl.appendChild(div);msgEl.scrollTop=msgEl.scrollHeight;return div}function addTyping(){return addMsg("bot","<div class=\\"typing\\"><span></span><span></span><span></span></div>")}function renderMd(t){return t.replace(/</g,"&lt;").replace(/>/g,"&gt;").split("\\n").join("<br>")}
function playAudio(text){
  var ctrl=document.getElementById("audio-controls");
  if(ctrl)ctrl.remove();
  fetch("/api/tts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:text})})
  .then(function(r){if(!r.ok)throw new Error("TTS failed");return r.blob()})
  .then(function(blob){
    var url=URL.createObjectURL(blob);
    var div=document.createElement("div");div.id="audio-controls";
    div.innerHTML="<audio id=\"audio-player\" controls autoplay src=\""+url+"\"></audio>";
    document.getElementById("app").appendChild(div);
  })
  .catch(function(e){console.error("Audio error:",e)});
}async function send(){var text=inputEl.value.trim();if(!text||sending)return;sending=true;sendBtn.disabled=true;inputEl.value="";inputEl.style.height="auto";addMsg("user",text);conversation.push({role:"user",content:text});var typing=addTyping();try{var res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:conversation})});var data=await res.json();typing.remove();if(data.error){addMsg("bot","<p>Error: "+data.error+"</p>")}else{addMsg("bot","<p>"+renderMd(data.reply)+"</p>");conversation.push({role:"assistant",content:data.reply});playAudio(data.reply)}}catch(e){typing.remove();addMsg("bot","<p>Error de conexion. Intenta de nuevo.</p>")}sending=false;sendBtn.disabled=!inputEl.value.trim()}</script></body></html>';

var SYSTEM_PROMPT = 'Sos un asistente AI experto del area de Mesa de Entrada y Salida. Tu tarea es responder preguntas basandote EXCLUSIVAMENTE en la siguiente documentacion oficial del Manual de Preguntas Frecuentes (FAQ). Si la pregunta no esta en el manual, indica que no tenes informacion sobre eso y sugiri contactar directamente al area. Respondes en espanol de forma clara, amable y concisa.\n\nDOCUMENTACION OFICIAL:\nManual de Preguntas Frecuentes (FAQ) Área de Mesa de Entrada y Salida Este documento ha sido diseñado como una herramienta de consulta ágil para optimizar la comunicación interdepartamental, clarificar las funciones de la Mesa de Entrada y Salida, y estandarizar los criterios de recepción y tramitación de expedientes. BLOQUE 1: Introducción, Roles y Accesos Básicos Q1: ¿Cuáles son las funciones principales del área de Mesa de Entrada y Salida? Respuesta: Nuestra área actúa como el canal oficial e institucional para el registro, control, resguardo temporal y distribución de la documentación y actuaciones administrativas. Las responsabilidades principales abarcan: ● Mesa de Entrada: Recepción formal, compulsa visual inicial, asignación de número de registro (si corresponde) y asentamiento de expedientes provenientes de otras áreas o del público externo. ● Mesa de Salida: Gestión, despacho, embalaje físico o remisión digital definitiva de las actuaciones tramitadas hacia sus destinos correspondientes, asegurando la debida constancia de recepción. ● Soporte Operativo: Asistencia en la gestión básica de usuarios del sistema informático de expedientes (blanqueo de credenciales). Q2: Necesito enviar un expediente a otra área, ¿cuál es el procedimiento interno que se sigue en Mesa de Entrada antes de la entrega? Respuesta: Con el fin de asegurar que toda la documentación cumpla estrictamente con la normativa administrativa vigente y evitar devoluciones innecesarias, aplicamos un circuito de control interno estructurado de la siguiente manera: 1. Recepción y Control Formal: Se recibe la documentación remitida por el departamento de origen de manera física o digital. 2. Instancia de Validación de Jefatura: Antes de formalizar la salida, el personal de Mesa presenta la documentación a la Jefatura del área para auditar que la estructura, las firmas y los anexos estén correctamente confeccionados. 3. Asentamiento y Despacho: Una vez obtenido el visto bueno de la Jefatura, se registra la salida oficial en el sistema de expedientes y se efectúa el traslado hacia el área de destino. Q3: No puedo ingresar al sistema de expedientes o se me bloqueó el usuario, ¿cómo puedo restablecer mi contraseña? Respuesta: Si presenta inconvenientes con sus credenciales de acceso, puede solicitar el blanqueo directo en nuestra oficina. Para procesar la solicitud de forma ágil, por favor facilítenos los siguientes datos obligatorios: ● Nombre completo del agente. ● Número de legajo o nombre de usuario en el sistema. ● Área o departamento al que pertenece. Nota: Se le asignará una contraseña provisoria de carácter genérico. Por razones estrictas de seguridad informática, el sistema le requerirá su modificación obligatoria en el primer inicio de sesión. BLOQUE 2: Procesos Habituales y Requisitos de Documentación Q4: ¿Qué criterios y elementos específicos revisa la Jefatura de Mesa de Entrada para dar por "bien hecha" una documentación? Respuesta: Para que un expediente o documento sea aprobado para su salida y distribución a otros departamentos, la Jefatura verifica rigurosamente el cumplimiento de los siguientes puntos: Elemento a Revisar Criterio de Aceptación Foliación y Orden Las hojas deben estar numeradas correlativamente, sin saltos, enmiendas ni tachaduras. Firmas y Aclaraciones Todo acto administrativo o informe debe contar con la firma, sello y aclaración de la autoridad competente o responsable del área originaria. Elemento a Revisar Criterio de Aceptación Documentación Anexa Si el texto menciona adjuntos (informes, facturas, planos), estos deben estar físicamente incorporados o vinculados digitalmente al expediente. Datos del Destinatario Debe especificarse con total claridad el área, departamento o funcionario de destino para evitar desvíos. Recomendamos realizar una lista de verificación rápida (checklist) en su propia área antes de remitirnos el trámite para agilizar los tiempos de despacho. Q5: ¿Cómo debo presentar físicamente un expediente para que sea recibido en la Mesa de Entrada? Respuesta: Para expedientes en soporte papel, es indispensable que se presenten en carpetas o contenedores normalizados según la reglamentación interna de la institución, debidamente cosidos o brochados para evitar el extravío de fojas sueltas. El primer folio debe corresponder siempre a la carátula oficial generada por el sistema, donde conste de forma legible el número de expediente, el extracto del asunto y la fecha de iniciación. BLOQUE 3: Resolución de Problemas y Excepciones (Troubleshooting) Q6: ¿Qué sucede si mi expediente presenta un error formal detectado por la Jefatura de Mesa de Entrada? Respuesta: Si durante la instancia de control la Jefatura observa una inconsistencia grave (por ejemplo, falta una firma obligatoria o la foliación es incorrecta), el expediente no podrá ser despachado a la otra área. Nos comunicaremos inmediatamente con el sector originario detallando la observación detectada para que procedan a subsanarla. El trámite quedará retenido temporalmente bajo estado "En revisión" y no continuará su curso formal hasta que sea corregido. Q7: Envié un expediente pero el área de destino afirma no haberlo recibido, ¿cómo puedo verificar el estado actual y la ubicación del trámite? Respuesta: En estos casos, se debe consultar de forma prioritaria el historial de movimientos dentro del sistema informático de gestión de expedientes utilizando el número único de identificación de la actuación. Allí podrá visualizar los siguientes estados: ● En Tránsito / Despachado: El trámite ya salió físicamente o digitalmente de Mesa de Entrada y se encuentra en camino al sector correspondiente. ● Recibido / Radicado: El área de destino ya aceptó formalmente el expediente y este se encuentra bajo la responsabilidad de dicha oficina. Si el sistema indica que fue despachado por nosotros pero el área de destino no lo visualiza, acérquese a nuestra oficina para que verifiquemos el remito físico de entrega firmado o el código de transferencia digital.';

export default {
  async fetch(request, env) {
    var url = new URL(request.url);

    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "")) {
      return new Response(HTML_PAGE, {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }

    if (request.method === "POST" && url.pathname === "/api/chat") {
      try {
        var body = await request.json();
        var msgs = body.messages || [];
        if (!msgs.length || msgs[0].role !== 'system') {
          msgs.unshift({role: 'system', content: SYSTEM_PROMPT});
        }

        var aiRes = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + env.DEEPSEEK_API_KEY,
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: msgs,
            max_tokens: 2048,
            temperature: 0.7,
          }),
        });

        var data = await aiRes.json();

        if (data.error) {
          return new Response(JSON.stringify({ error: data.error.message || "API error" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        var reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "Sin respuesta";
        return new Response(JSON.stringify({ reply: reply }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    if (request.method === "POST" && url.pathname === "/api/tts") {
      try {
        var body = await request.json();
        var text = body.text || "";
        if (!text) {
          return new Response(JSON.stringify({ error: "No text provided" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        var ttsRes = await fetch(
          "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "xi-api-key": env.ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
              text: text,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
              },
            }),
          }
        );

        if (!ttsRes.ok) {
          var errData = await ttsRes.text();
          return new Response(JSON.stringify({ error: "TTS error: " + errData }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(ttsRes.body, {
          headers: {
            "Content-Type": "audio/mpeg",
            "Transfer-Encoding": "chunked",
          },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return new Response("Not Found", { status: 404 });
  },
};
