import { Heading } from '@/components/heading'
import { Orders } from '@/modules/orders/types/orders'
import { format } from 'date-fns'
import { Notebook, ShoppingCart, Truck, UserIcon } from 'lucide-react'
import { InfoCard } from './components/info-card'

interface OrderDetailsProps {
  order: Orders | null
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Detalhes do pedido" />
      </div>
      <div className="bg-white rounded-lg p-4">
        <div className="space-y-2">
          <h3 className="font-bold">
            #ID - <span className="text-xs">{order?.id}</span>
          </h3>
          <h1 className="text-xs font-bold">Produto: {order?.title}</h1>
          <div className="text-xs">
            {order?.createdAt
              ? format(new Date(order.createdAt), 'dd/MM/yyyy')
              : ''}
          </div>
          <div className="text-xs">{order?.status}</div>
        </div>
        <div className="md:grid grid-cols-4 mt-10 mb-10">
          <InfoCard
            title="Cliente"
            icon={<UserIcon size={24} className="text-gray-400" />}
            content={
              <>
                <div className="text-xs">Nome: {order?.customer?.name}</div>
                <div className="text-xs">E-mail: {order?.customer?.email}</div>
                <div className="text-xs">
                  Telefone: {order?.customer?.phone}
                </div>
              </>
            }
          />
          <InfoCard
            title="Pagamento"
            icon={<ShoppingCart size={24} className="text-gray-400" />}
            content={
              <>
                <div className="text-xs">Tipo pagamento: {order?.payment}</div>
                <div className="text-xs">Status: {order?.status}</div>
              </>
            }
          />
          <InfoCard
            title="Entrega"
            icon={<Truck size={24} className="text-gray-400" />}
            content={
              <>
                <div className="text-xs">Endereço: {order?.address}</div>
              </>
            }
          />
          <InfoCard
            title="Observações"
            icon={<Notebook size={24} className="text-gray-400" />}
            content={
              <>
                <div className="text-xs">Obs: {order?.notes}</div>
              </>
            }
          />
        </div>
      </div>
    </>
  )
}
