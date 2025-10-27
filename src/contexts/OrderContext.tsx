import React, { createContext, useContext, useState, useEffect } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface TrackingEvent {
  id: string;
  timestamp: Date;
  status: TrackingStatus;
  location?: string;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  carrier: 'Postnode.se' | 'PostNord' | 'DHL' | 'Other';
  trackingHistory: TrackingEvent[];
  estimatedDelivery?: Date;
  paymentIntentId?: string;
}

export type OrderStatus = 'processing' | 'shipped' | 'in-transit' | 'delivered' | 'cancelled';
export type TrackingStatus = 'order-placed' | 'shipped' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'failed-delivery';

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: OrderData) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addTrackingNumber: (orderId: string, trackingNumber: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByEmail: (email: string) => Order[];
  addTrackingEvent: (orderId: string, event: Omit<TrackingEvent, 'id'>) => void;
}

interface OrderData {
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: OrderItem[];
  total: number;
  paymentIntentId?: string;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('quality-hair-orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders.map((order: any) => ({
          ...order,
          date: new Date(order.date),
          trackingHistory: order.trackingHistory?.map((event: any) => ({
            ...event,
            timestamp: new Date(event.timestamp)
          })),
          estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined
        })));
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quality-hair-orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = async (orderData: OrderData): Promise<Order> => {
    const newOrder: Order = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderNumber: `QH-${new Date().getFullYear()}-${String(orders.length + 1).padStart(4, '0')}`,
      date: new Date(),
      status: 'processing',
      total: orderData.total,
      items: orderData.items,
      customerInfo: orderData.customerInfo,
      shippingAddress: orderData.shippingAddress,
      carrier: 'Postnode.se',
      trackingHistory: [{
        id: `event-${Date.now()}`,
        timestamp: new Date(),
        status: 'order-placed',
        description: 'Order placed successfully'
      }],
      paymentIntentId: orderData.paymentIntentId,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    };

    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? {
            ...order,
            status,
            trackingHistory: [
              ...order.trackingHistory,
              {
                id: `event-${Date.now()}`,
                timestamp: new Date(),
                status: status === 'shipped' ? 'shipped' :
                        status === 'delivered' ? 'delivered' :
                        status === 'cancelled' ? 'failed-delivery' : 'in-transit',
                description: `Order status updated to ${status}`
              }
            ]
          }
        : order
    ));
  };

  const addTrackingNumber = (orderId: string, trackingNumber: string) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? {
            ...order,
            trackingNumber,
            status: 'shipped',
            trackingHistory: [
              ...order.trackingHistory,
              {
                id: `event-${Date.now()}`,
                timestamp: new Date(),
                status: 'shipped',
                description: `Tracking number added: ${trackingNumber}`
              }
            ]
          }
        : order
    ));
  };

  const addTrackingEvent = (orderId: string, event: Omit<TrackingEvent, 'id'>) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? {
            ...order,
            trackingHistory: [
              ...order.trackingHistory,
              { ...event, id: `event-${Date.now()}` }
            ]
          }
        : order
    ));
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const getOrdersByEmail = (email: string) => {
    return orders.filter(order => order.customerInfo.email === email);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      updateOrderStatus,
      addTrackingNumber,
      getOrderById,
      getOrdersByEmail,
      addTrackingEvent
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
}

// Helper functions for order management
export const generateOrderConfirmationEmail = (order: Order) => {
  return {
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: `
      <h2>Thank you for your order!</h2>
      <p>Your order ${order.orderNumber} has been received and is being processed.</p>
      <p><strong>Estimated delivery:</strong> ${order.estimatedDelivery?.toLocaleDateString('sv-SE')}</p>
      <p>We'll send you tracking information once your order ships.</p>
      <p>Order total: €${order.total.toFixed(2)}</p>
    `
  };
};

export const generateShippingConfirmationEmail = (order: Order) => {
  if (!order.trackingNumber) return null;

  return {
    subject: `Your order has shipped - ${order.orderNumber}`,
    html: `
      <h2>Great news! Your order has shipped.</h2>
      <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
      <p><strong>Carrier:</strong> ${order.carrier}</p>
      <p><a href="https://postnode.se/track/${order.trackingNumber}" target="_blank">Track your package</a></p>
      <p><strong>Estimated delivery:</strong> ${order.estimatedDelivery?.toLocaleDateString('sv-SE')}</p>
    `
  };
};

export const generateDeliveryConfirmationEmail = (order: Order) => {
  return {
    subject: `Your order has been delivered - ${order.orderNumber}`,
    html: `
      <h2>Your order has been delivered!</h2>
      <p>We hope you're happy with your purchase. If you have any questions or need assistance, please don't hesitate to contact us.</p>
      <p>Order: ${order.orderNumber}</p>
      <p>Thank you for choosing Quality Hair!</p>
    `
  };
};