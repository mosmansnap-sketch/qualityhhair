import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Package, Truck, Clock, CheckCircle, XCircle, Eye, Search, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface Order {
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
  };
  shippingAddress: {
    street: string;
    city: string;
    zipCode: string;
  };
  trackingNumber?: string;
  carrier: 'Postnode.se' | 'PostNord' | 'DHL' | 'Other';
  trackingHistory: TrackingEvent[];
  estimatedDelivery?: Date;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface TrackingEvent {
  id: string;
  timestamp: Date;
  status: TrackingStatus;
  location?: string;
  description: string;
}

type OrderStatus = 'processing' | 'shipped' | 'in-transit' | 'delivered' | 'cancelled';
type TrackingStatus = 'order-placed' | 'shipped' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'failed-delivery';

interface CustomerDashboardProps {
  orders?: Order[];
}

export function CustomerDashboard({ orders = [] }: CustomerDashboardProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration - replace with actual data
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'QH-2025-001',
      date: new Date('2025-01-15'),
      status: 'delivered',
      total: 650,
      items: [
        { id: '1', name: 'Hair Treatment Kit - Full Size', quantity: 1, price: 295 },
        { id: '2', name: 'Organic Hair Oil', quantity: 2, price: 89.50 }
      ],
      customerInfo: {
        firstName: 'Anna',
        lastName: 'Andersson',
        email: 'anna.andersson@email.com'
      },
      shippingAddress: {
        street: 'Storgatan 123',
        city: 'Stockholm',
        zipCode: '114 45'
      },
      trackingNumber: 'PN123456789SE',
      carrier: 'Postnode.se',
      trackingHistory: [
        { id: '1', timestamp: new Date('2025-01-15'), status: 'order-placed', description: 'Order placed' },
        { id: '2', timestamp: new Date('2025-01-16'), status: 'shipped', description: 'Package shipped from warehouse' },
        { id: '3', timestamp: new Date('2025-01-17'), status: 'in-transit', description: 'Package in transit to delivery location' },
        { id: '4', timestamp: new Date('2025-01-18'), status: 'delivered', description: 'Package delivered successfully' }
      ],
      estimatedDelivery: new Date('2025-01-18')
    },
    {
      id: '2',
      orderNumber: 'QH-2025-002',
      date: new Date('2025-01-20'),
      status: 'shipped',
      total: 295,
      items: [
        { id: '3', name: 'Hair Treatment Kit - Moderate Size', quantity: 1, price: 235 }
      ],
      customerInfo: {
        firstName: 'Maria',
        lastName: 'Lindberg',
        email: 'maria.lindberg@email.com'
      },
      shippingAddress: {
        street: 'Kungsgatan 45',
        city: 'Göteborg',
        zipCode: '411 15'
      },
      trackingNumber: 'PN987654321SE',
      carrier: 'Postnode.se',
      trackingHistory: [
        { id: '5', timestamp: new Date('2025-01-20'), status: 'order-placed', description: 'Order placed' },
        { id: '6', timestamp: new Date('2025-01-21'), status: 'shipped', description: 'Package shipped from warehouse' }
      ],
      estimatedDelivery: new Date('2025-01-23')
    },
    {
      id: '3',
      orderNumber: 'QH-2025-003',
      date: new Date('2025-01-22'),
      status: 'processing',
      total: 165,
      items: [
        { id: '4', name: 'Hair Treatment Kit - Minimal Size', quantity: 1, price: 165 }
      ],
      customerInfo: {
        firstName: 'Eva',
        lastName: 'Olsson',
        email: 'eva.olsson@email.com'
      },
      shippingAddress: {
        street: 'Drottninggatan 78',
        city: 'Malmö',
        zipCode: '211 45'
      },
      carrier: 'Postnode.se',
      trackingHistory: [
        { id: '7', timestamp: new Date('2025-01-22'), status: 'order-placed', description: 'Order placed' }
      ]
    }
  ];

  const displayOrders = orders.length > 0 ? orders : mockOrders;

  const filteredOrders = displayOrders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = searchTerm === '' ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'in-transit': return <Package className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: OrderStatus | TrackingStatus) => {
    switch (status) {
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-yellow-100 text-yellow-800';
      case 'in-transit': return 'bg-orange-100 text-orange-800';
      case 'out-for-delivery': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'failed-delivery': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const generateTrackingUrl = (trackingNumber: string, carrier: string) => {
    switch (carrier) {
      case 'Postnode.se':
        return `https://postnode.se/track/${trackingNumber}`;
      case 'PostNord':
        return `https://www.postnord.se/skicka/spara/${trackingNumber}`;
      case 'DHL':
        return `https://www.dhl.com/se-sv/home/tracking.html?tracking-id=${trackingNumber}`;
      default:
        return '#';
    }
  };

  if (selectedOrder) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => setSelectedOrder(null)}
          className="mb-6"
        >
          <Eye className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>

        <OrderDetails
          order={selectedOrder}
          onUpdateTracking={(trackingNumber) => {
            // Update tracking number logic
            console.log('Update tracking:', trackingNumber);
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track your orders and view order history</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as OrderStatus | 'all')}
              className="pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
                  <p className="text-muted-foreground">{formatDate(order.date)}</p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusIcon(order.status)}
                  <span className="ml-1">{order.status}</span>
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <div className="space-y-1">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.zipCode} {order.shippingAddress.city}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">
                  Total: €{order.total.toFixed(2)}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  {order.trackingNumber && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => order.trackingNumber && window.open(generateTrackingUrl(order.trackingNumber, order.carrier), '_blank')}
                    >
                      <Truck className="h-4 w-4 mr-1" />
                      Track
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No orders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Order Details Component
interface OrderDetailsProps {
  order: Order;
  onUpdateTracking: (trackingNumber: string) => void;
}

function OrderDetails({ order, onUpdateTracking }: OrderDetailsProps) {
  const [showTrackingForm, setShowTrackingForm] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '');

  const getStatusIcon = (status: TrackingStatus) => {
    switch (status) {
      case 'order-placed': return <Clock className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'in-transit': return <Package className="h-4 w-4" />;
      case 'out-for-delivery': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'failed-delivery': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: TrackingStatus) => {
    switch (status) {
      case 'order-placed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-yellow-100 text-yellow-800';
      case 'in-transit': return 'bg-orange-100 text-orange-800';
      case 'out-for-delivery': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'failed-delivery': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{order.orderNumber}</h2>
            <p className="text-muted-foreground">{formatDate(order.date)}</p>
          </div>
          <Badge className={getStatusColor(order.status as any)}>{order.status}</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">€{item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Shipping Information</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {order.customerInfo.firstName} {order.customerInfo.lastName}</p>
              <p><strong>Email:</strong> {order.customerInfo.email}</p>
              <p><strong>Address:</strong> {order.shippingAddress.street}</p>
              <p><strong>City:</strong> {order.shippingAddress.zipCode} {order.shippingAddress.city}</p>
              <p><strong>Carrier:</strong> {order.carrier}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total: €{order.total.toFixed(2)}</span>
            <div className="flex gap-2">
              {order.trackingNumber && (
                <Button
                  onClick={() => window.open(`https://postnode.se/track/${order.trackingNumber}`, '_blank')}
                >
                  <Truck className="h-4 w-4 mr-1" />
                  Track Package
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setShowTrackingForm(!showTrackingForm)}
              >
                <Package className="h-4 w-4 mr-1" />
                {order.trackingNumber ? 'Update Tracking' : 'Add Tracking'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Tracking Form */}
      {showTrackingForm && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">{order.trackingNumber ? 'Update' : 'Add'} Tracking Number</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter tracking number (e.g., PN123456789SE)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              onClick={() => {
                onUpdateTracking(trackingNumber);
                setShowTrackingForm(false);
              }}
              disabled={!trackingNumber.trim()}
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowTrackingForm(false);
                setTrackingNumber(order.trackingNumber || '');
              }}
            >
              Cancel
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your Postnode.se tracking number to track your package.
          </p>
        </Card>
      )}

      {/* Tracking Timeline */}
      {order.trackingHistory.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Tracking History</h3>
          <div className="space-y-4">
            {order.trackingHistory.map((event, index) => (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(event.status)}`}>
                    {getStatusIcon(event.status)}
                  </div>
                  {index < order.trackingHistory.length - 1 && (
                    <div className="w-0.5 h-16 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h4 className="font-medium">{event.description}</h4>
                  <p className="text-sm text-muted-foreground">{formatDate(event.timestamp)}</p>
                  {event.location && (
                    <p className="text-sm text-muted-foreground">Location: {event.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Estimated Delivery */}
      {order.estimatedDelivery && (
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Estimated Delivery</h3>
          <p className="text-lg">{formatDate(order.estimatedDelivery)}</p>
          <p className="text-sm text-muted-foreground">
            Delivery time may vary based on your location and shipping method.
          </p>
        </Card>
      )}
    </div>
  );
}

export default CustomerDashboard;