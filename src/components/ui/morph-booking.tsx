import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, User, Phone, Mail, Clock, Sparkles } from 'lucide-react';
import { cn } from './utils';
import { Input } from './input';
import { Label } from './label';
import { Button } from './button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { toast } from 'sonner';

interface MorphBookingProps {
  className?: string;
  onSubmit?: (data: BookingFormData) => void;
}

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  treatmentType: string;
}

export function MorphBooking({ className, onSubmit }: MorphBookingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    treatmentType: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit?.(formData);
    toast.success('Booking Request Sent!', {
      description: "We'll contact you shortly to confirm your appointment.",
    });
    
    setIsSubmitting(false);
    setIsOpen(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      preferredDate: '',
      preferredTime: '',
      treatmentType: '',
    });
  };

  const treatmentOptions = [
    { value: 'minimal', label: 'Minimal - €165' },
    { value: 'moderate', label: 'Moderate - €235' },
    { value: 'full', label: 'Full - €295' },
    { value: 'maximum', label: 'Maximum - €375' },
    { value: 'consultation', label: 'Free Consultation' },
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
  ];

  return (
    <div className={cn('fixed bottom-6 right-6 z-50', className)}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className={cn(
              'flex items-center gap-3 px-6 py-4 rounded-full',
              'bg-gradient-to-r from-primary to-accent text-white',
              'shadow-lg hover:shadow-xl transition-shadow duration-300',
              'font-medium'
            )}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Calendar className="w-5 h-5" />
            </motion.div>
            <span>Book Your Treatment</span>
            <Sparkles className="w-4 h-4" />
          </motion.button>
        ) : (
          <motion.div
            key="form"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'w-[350px] max-h-[80vh] overflow-y-auto',
              'bg-card rounded-2xl shadow-2xl border border-border',
              'p-6'
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Book Appointment
              </h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4" /> Name
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" /> Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+46 70 123 4567"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" /> Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4" /> Treatment
                </Label>
                <Select
                  value={formData.treatmentType}
                  onValueChange={(value) => setFormData({ ...formData, treatmentType: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    {treatmentOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" /> Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="bg-background"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" /> Time
                  </Label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full mt-4 py-3',
                  'bg-gradient-to-r from-primary to-accent text-white',
                  'hover:opacity-90 transition-opacity'
                )}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  'Confirm Booking'
                )}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
