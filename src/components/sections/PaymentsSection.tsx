import React from 'react';
import { CreditCard, CheckCircle, AlertCircle, DollarSign, Calendar, TrendingUp, Download } from 'lucide-react';

export function PaymentsSection() {
  const payments = [
    {
      id: 1,
      month: 'Noviembre 2024',
      amount: 280.00,
      status: 'paid',
      dueDate: '2024-11-15',
      paidDate: '2024-11-10',
      type: 'Pensión Regular'
    },
    {
      id: 2,
      month: 'Diciembre 2024',
      amount: 280.00,
      status: 'pending',
      dueDate: '2024-12-15',
      type: 'Pensión Regular'
    },
    {
      id: 3,
      month: 'Certificado de Estudios',
      amount: 15.00,
      status: 'paid',
      dueDate: '2024-11-20',
      paidDate: '2024-11-18',
      type: 'Trámite'
    }
  ];

  const paymentStats = [
    {
      label: 'Total Pagado',
      value: 'S/. 575.00',
      change: '+S/. 295.00',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      label: 'Pendiente',
      value: 'S/. 280.00',
      change: 'Vence: 15/12',
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-amber-50'
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

  return (
    <div id="pagos" className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Estado de Pagos</h2>
              <p className="text-green-100 text-lg">Pensiones y trámites académicos</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="text-right">
              <p className="text-sm font-medium text-green-100">Saldo Pendiente</p>
              <p className="text-4xl font-bold">S/. 280.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {paymentStats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-gray-100`}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payments List */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Historial de Pagos</h3>
          {payments.map((payment) => {
            const StatusIcon = getStatusIcon(payment.status);
            return (
              <div key={payment.id} className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${
                      payment.status === 'paid' ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'
                    } rounded-xl flex items-center justify-center shadow-sm`}>
                      <StatusIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{payment.month}</h3>
                      <p className="text-gray-600 mt-1">{payment.type}</p>
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
                    <span className="font-medium">Vence: {new Date(payment.dueDate).toLocaleDateString('es-PE')}</span>
                  </div>
                  {payment.status === 'paid' && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Pagado: {new Date(payment.paidDate).toLocaleDateString('es-PE')}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Método: Banco de la Nación</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md">
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Realizar Pago</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-sm hover:shadow-md">
              <Download className="w-5 h-5" />
              <span className="font-medium">Descargar Recibo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}