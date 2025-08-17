import React from 'react';
import { useState } from 'react';
import { 
  FileText, 
  CreditCard, 
  GraduationCap, 
  Download, 
  Mail, 
  Phone,
  ExternalLink,
  Calendar,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function QuickActions() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '', type: '' });

  const showActionModal = (title: string, content: string, type: string = 'info') => {
    setModalContent({ title, content, type });
    setShowModal(true);
  };

  const actions = [
    {
      icon: FileText,
      title: 'Certificados',
      description: 'Solicitar documentos',
      color: 'bg-blue-500',
      action: () => showActionModal(
        'Solicitar Certificados',
        `📋 **Certificados Disponibles:**

• Certificado de Estudios - S/. 15.00
• Constancia de Matrícula - S/. 10.00
• Récord Académico - S/. 20.00
• Constancia de Egresado - S/. 25.00

**Proceso:**
1. Realizar pago en Banco de la Nación
2. Presentar voucher en Secretaría
3. Recoger en 3 días hábiles

**Horario:** Lunes a Viernes 8:00 - 16:00`,
        'success'
      )
    },
    {
      icon: CreditCard,
      title: 'Pagos',
      description: 'Estado de pensiones',
      color: 'bg-green-500',
      action: () => showActionModal(
        'Estado de Pagos',
        `💳 **Estado Actual:**

**Noviembre 2024:** ✅ Pagado (S/. 280.00)
**Diciembre 2024:** ⏳ Pendiente (Vence: 15/12/2024)

**Métodos de Pago:**
• Banco de la Nación - Código: 8756
• Banco Continental - Cuenta: 0011-0156-0200150001
• Agentes autorizados
• Pago en línea: portal.unc.edu.pe

**Descuentos disponibles:**
• Pago puntual: 5%
• Hermanos: 10%`,
        'info'
      )
    },
    {
      icon: GraduationCap,
      title: 'Notas',
      description: 'Consultar calificaciones',
      color: 'bg-purple-500',
      action: () => showActionModal(
        'Historial Académico',
        `📊 **Resumen Académico:**

**Semestre Actual (IX):**
• Promedio: 16.48
• Créditos: 18/20
• Cursos aprobados: 5/5

**Historial General:**
• Promedio acumulado: 15.67
• Créditos totales: 156/200
• Avance curricular: 78%

**Ranking:** 15/120 estudiantes
**Tercio superior:** ✅ Sí`,
        'success'
      )
    },
    {
      icon: Download,
      title: 'Descargas',
      description: 'Documentos y recursos',
      color: 'bg-orange-500',
      action: () => showActionModal(
        'Biblioteca Digital',
        `📚 **Recursos Disponibles:**

**Libros Digitales:**
• Ingeniería de Software - Sommerville
• Algoritmos y Estructuras de Datos
• Base de Datos - Elmasri & Navathe
• Redes de Computadoras - Tanenbaum

**Documentos Académicos:**
• Sílabos del semestre actual
• Guías de laboratorio
• Proyectos de tesis anteriores
• Reglamentos académicos

**Acceso:** biblioteca.unc.edu.pe`,
        'info'
      )
    },
    {
      icon: Calendar,
      title: 'Calendario',
      description: 'Eventos académicos',
      color: 'bg-indigo-500',
      action: () => showActionModal(
        'Calendario Académico 2024-II',
        `📅 **Fechas Importantes:**

**Noviembre 2024:**
• 15 Nov: Conferencia IA en la Industria
• 17 Nov: Taller React.js
• 20-22 Nov: Congreso de Sistemas
• 25 Nov: Feria de Proyectos

**Diciembre 2024:**
• 02-13 Dic: Exámenes finales
• 15 Dic: Fin de clases
• 16-20 Dic: Exámenes sustitutorios
• 23 Dic: Publicación de notas`,
        'info'
      )
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Correo institucional',
      color: 'bg-red-500',
      action: () => {
        showActionModal(
          'Correo Institucional',
          `📧 **Acceso al Correo:**

**Tu correo:** 202015001@unc.edu.pe
**Servidor:** Gmail para Educación

**Accesos:**
• Web: mail.google.com
• Móvil: App Gmail
• Outlook: Configuración IMAP

**Soporte técnico:**
• Email: soporte.ti@unc.edu.pe
• Teléfono: 076-365430 Ext. 123`,
          'info'
        );
        setTimeout(() => {
          window.open('https://mail.google.com', '_blank');
        }, 2000);
      }
    }
  ];

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <ExternalLink className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Accesos Rápidos</h2>
        </div>
      
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="group flex flex-col items-center p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-md"
            >
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">{action.title}</h3>
              <p className="text-xs text-gray-500 text-center mt-1">{action.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Contacto de Emergencia</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
              <Phone className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700 font-medium">+51 076 365 430</span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700 font-medium">sistemas@unc.edu.pe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {modalContent.type === 'success' && <CheckCircle className="w-6 h-6 text-green-600" />}
                  {modalContent.type === 'info' && <AlertCircle className="w-6 h-6 text-blue-600" />}
                  <h3 className="text-xl font-bold text-gray-900">{modalContent.title}</h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {modalContent.content}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}