import React, { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

function ChatWidget() {
  useEffect(() => {
    const chat = createChat({
      webhookUrl: 'https://diehc.app.n8n.cloud/webhook/90e68585-c69a-4e6c-ba85-cfdff32fd98e/chat',
      mode: 'window',
      showWelcomeScreen: true,
      defaultLanguage: 'en',
      initialMessages: [
        '¡Hola! 👋',
        'Soy tu asistente virtual del Colegio Secundario. ¿En qué puedo ayudarte hoy?'
      ],
      i18n: {
        en: {
          title: '¡Hola! 👋',
          subtitle: 'Soy tu asistente virtual de la UNC. Estoy aquí para ayudarte 24/7.',
          footer: 'Colegio',
          getStarted: 'Nueva Conversación',
          inputPlaceholder: 'Escribe tu pregunta...',
          closeButtonTooltip: 'Cerrar chat'
        },
      },
      metadata: {
        userId: '202015001',
        userType: 'student',
        institution: 'Colegio Secundario'
      },
      webhookConfig: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });

    return () => {
      chat.unmount();
    };
  }, []);

  return (
    <div id="n8n-chat" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}></div>
  );
}

export default ChatWidget;