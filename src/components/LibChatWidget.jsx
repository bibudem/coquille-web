import { useEffect, useState } from "react";
import Div from '@/components/utils/Div';

const LIBCHAT_HASH = "71ff3bc4ca990e9e993a02e35e2f804aa581c52535e870359e707314a83afdd3";

const LibChatWidget = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Injecter un style global pour masquer le bouton flottant LibChat
    const style = document.createElement("style");
    style.innerHTML = `
      .s-lch-widget-float-btn {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);

    const existingScript = document.getElementById("libchat-script");
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = "libchat-script";
    script.src = `https://unequestion.bib.umontreal.ca/load_chat.php?hash=${LIBCHAT_HASH}`;
    script.async = true;

    script.onload = () => {
      window.libChatLoaded = true;
    };

    script.onerror = () => {
      console.error("Échec du chargement du script LibChat.");
      setError(true);
      window.libChatLoaded = false;
    };

    document.body.appendChild(script);

    window.openLibChatDirect = () => {
      if (!window.libChatLoaded) {
        alert("Le service de clavardage est temporairement indisponible.");
        return;
      }

      const chatButton = document.querySelector(".s-lch-widget-float-btn");
      const chatBoite = document.querySelector(".s-lch-widget-float");

      if (chatButton) {
        chatButton.style.opacity = "0";
        chatButton.style.pointerEvents = "none";
        chatButton.style.visibility = "hidden";
        chatButton.click();
      }

      if (chatBoite) {
        chatBoite.style.zIndex = "99999";
      }
    };

    return () => {
      window.openLibChatDirect = undefined;
      window.libChatLoaded = false;
      const addedScript = document.getElementById("libchat-script");
      if (addedScript) {
        addedScript.remove();
      }
    };
  }, []);

  return (
    <>
      <Div
        id={`libchat_${LIBCHAT_HASH}`}
        style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          zIndex: 99999
        }}
      />
      {error && (
        <Div
          sx={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            backgroundColor: '#f44336',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '8px',
            zIndex: 99999,
          }}
        >
          Le service de clavardage est temporairement indisponible.
        </Div>
      )}
    </>
  );
};

export default LibChatWidget;
