import React, { useState } from 'react';
import { CreditCard, CheckCircle, AlertCircle, DollarSign, Calendar, TrendingUp, Download, Printer } from 'lucide-react';

export function PaymentsSection() {
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [showDownloadConfirmation, setShowDownloadConfirmation] = useState(false);

  const payments = [
    {
      id: 1,
      month: 'Noviembre 2024',
      amount: 280.00,
      status: 'paid',
      dueDate: '2024-11-15',
      paidDate: '2024-11-10',
      type: 'Pensión Regular',
      description: 'Pago mensual de la pensión universitaria.'
    },
    {
      id: 2,
      month: 'Diciembre 2024',
      amount: 280.00,
      status: 'pending',
      dueDate: '2024-12-15',
      type: 'Pensión Regular',
      description: 'Próximo pago mensual de la pensión.'
    },
    {
      id: 3,
      month: 'Certificado de Estudios',
      amount: 15.00,
      status: 'paid',
      dueDate: '2024-11-20',
      paidDate: '2024-11-18',
      type: 'Trámite',
      description: 'Costo por la emisión del certificado oficial.'
    },
    {
      id: 4,
      month: 'Matrícula 2024-II',
      amount: 100.00,
      status: 'paid',
      dueDate: '2024-08-01',
      paidDate: '2024-07-28',
      type: 'Matrícula',
      description: 'Pago por concepto de matrícula del segundo semestre.'
    }
  ];

  const paymentStats = [
    {
      label: 'Total Pagado',
      value: 'S/. 675.00',
      change: '+S/. 380.00',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      detail: 'En el ciclo actual.'
    },
    {
      label: 'Pendiente',
      value: 'S/. 280.00',
      change: 'Vence: 15/12',
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-100',
      detail: 'Pensión de Diciembre.'
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'paid' 
      ? 'bg-green-100 text-green-700 border-green-200' 
      : 'bg-red-100 text-red-700 border-red-200';
  };

  const getStatusIcon = (status: string) => {
    return status === 'paid' ? CheckCircle : AlertCircle;
  };

  const handleMakePayment = () => {
    setShowPaymentConfirmation(true);
    setTimeout(() => setShowPaymentConfirmation(false), 3000); // Hide after 3 seconds
  };

  const handleDownloadReceipt = () => {
    setShowDownloadConfirmation(true);
    setTimeout(() => setShowDownloadConfirmation(false), 3000); // Hide after 3 seconds
    console.log('Simulando descarga de recibo...');
    // Aquí podrías añadir la lógica real para generar/descargar el PDF
  };

  return (
    <div id="pagos" className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Estado de Pagos</h2>
              <p className="text-orange-100 text-lg">Pensiones y trámites académicos</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="text-right">
              <p className="text-sm font-medium text-orange-100">Saldo Pendiente</p>
              <p className="text-4xl font-bold">S/. 280.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {paymentStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200`}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                  {stat.detail && <p className="text-xs text-gray-400 mt-1">{stat.detail}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payments List */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Historial de Pagos</h3>
        {payments.map((payment) => {
          const StatusIcon = getStatusIcon(payment.status);
          return (
            <div key={payment.id} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    payment.status === 'paid' ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'
                  } rounded-xl flex items-center justify-center shadow-sm`}>
                    <StatusIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{payment.month}</h3>
                    <p className="text-gray-600 mt-1 text-sm">{payment.type}</p>
                    {payment.description && <p className="text-gray-500 text-xs mt-1">{payment.description}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">S/. {payment.amount.toFixed(2)}</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(payment.status)}`}>
                    <StatusIcon className="w-4 h-4 mr-1" />
                    {payment.status === 'paid' ? 'Pagado' : 'Pendiente'}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-sm">Vence: {new Date(payment.dueDate).toLocaleDateString('es-PE')}</span>
                </div>
                {payment.status === 'paid' && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-sm">Pagado: {new Date(payment.paidDate).toLocaleDateString('es-PE')}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-sm">Método: Banco de la Nación</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Acciones de Pago</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={handleMakePayment}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <CreditCard className="w-5 h-5" />
            <span className="font-medium">Realizar Pago</span>
          </button>
          <button 
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Printer className="w-5 h-5" />
            <span className="font-medium">Descargar Recibo</span>
          </button>
        </div>
        {showPaymentConfirmation && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm text-center border border-green-200">
            Pago simulado realizado con éxito. ¡Gracias!
          </div>
        )}
        {showDownloadConfirmation && (
          <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-lg text-sm text-center border border-blue-200">
            Descarga de recibo simulada. Revisa tu consola.
          </div>
        )}
      </div>
    </div>
  );
}