import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, Mail, User, Sparkles, CreditCard, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card } from './ui/card';
import { toast } from 'sonner';

export function ConsultationBooking() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hairType: '',
    currentHairConcerns: '',
    preferredDate: '',
    preferredTime: '',
    additionalNotes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.preferredDate || !formData.preferredTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine date and time
      const consultationDateTime = `${formData.preferredDate}T${formData.preferredTime}:00`;

      // Create Stripe Checkout session
      const response = await fetch('/api/create-consultation-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          consultationDate: consultationDateTime,
          hairType: formData.hairType,
          concerns: formData.currentHairConcerns,
          successUrl: `${window.location.origin}/consultation-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/#consultation`,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating consultation checkout:', error);
      toast.error('Failed to process booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date as minimum selectable date
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <section id="consultation" className="py-16 md:py-24 bg-gradient-to-b from-accent/5 to-background">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">€10 Consultation Fee</span>
          </div>
          <h2 className="mb-4">
            Not Sure? Book a Personal Consultation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized advice from our hair experts. We'll analyze your hair type, discuss your concerns, and recommend the perfect treatment plan for you.
          </p>
          <p className="text-sm text-primary mt-2 font-medium">
            If you purchase during the consultation, the €10 fee is credited toward your order!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6 md:p-8 border-2 border-border shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 font-medium">
                      <User className="h-4 w-4 text-primary" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 focus:border-primary/50 focus:bg-gradient-to-r focus:from-primary/10 focus:to-accent/10 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 font-medium">
                      <Phone className="h-4 w-4 text-primary" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+31 6 12345678"
                      className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 focus:border-primary/50 focus:bg-gradient-to-r focus:from-primary/10 focus:to-accent/10 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 font-medium">
                    <Mail className="h-4 w-4 text-primary" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 focus:border-primary/50 focus:bg-gradient-to-r focus:from-primary/10 focus:to-accent/10 transition-all duration-300"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your discount code will be sent to this email after payment
                  </p>
                </div>
              </div>

              {/* Hair Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Hair Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="hairType" className="font-medium">Hair Type / Texture</Label>
                    <Select
                      value={formData.hairType}
                      onValueChange={(value) => setFormData({ ...formData, hairType: value })}
                    >
                      <SelectTrigger className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 focus:border-primary/50 focus:bg-gradient-to-r focus:from-primary/10 focus:to-accent/10 transition-all duration-300">
                        <SelectValue placeholder="Select your hair type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="straight">Straight (Type 1)</SelectItem>
                        <SelectItem value="wavy-2a">Wavy 2A</SelectItem>
                        <SelectItem value="wavy-2b">Wavy 2B</SelectItem>
                        <SelectItem value="wavy-2c">Wavy 2C</SelectItem>
                        <SelectItem value="curly-3a">Curly 3A</SelectItem>
                        <SelectItem value="curly-3b">Curly 3B</SelectItem>
                        <SelectItem value="curly-3c">Curly 3C</SelectItem>
                        <SelectItem value="coily-4a">Coily 4A</SelectItem>
                        <SelectItem value="coily-4b">Coily 4B</SelectItem>
                        <SelectItem value="coily-4c">Coily 4C</SelectItem>
                        <SelectItem value="not-sure">Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="concerns" className="font-medium">Main Hair Concerns</Label>
                    <Select
                      value={formData.currentHairConcerns}
                      onValueChange={(value) => setFormData({ ...formData, currentHairConcerns: value })}
                    >
                      <SelectTrigger className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 focus:border-primary/50 focus:bg-gradient-to-r focus:from-primary/10 focus:to-accent/10 transition-all duration-300">
                        <SelectValue placeholder="Select main concern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frizz">Frizz Control</SelectItem>
                        <SelectItem value="damage">Heat Damage</SelectItem>
                        <SelectItem value="breakage">Breakage & Fallout</SelectItem>
                        <SelectItem value="dryness">Dryness</SelectItem>
                        <SelectItem value="manageability">Manageability</SelectItem>
                        <SelectItem value="definition">Curl Definition</SelectItem>
                        <SelectItem value="growth">Hair Growth</SelectItem>
                        <SelectItem value="multiple">Multiple Concerns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Appointment Scheduling Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Appointment Scheduling
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2 font-medium">
                      <Calendar className="h-4 w-4 text-primary" />
                      Preferred Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      min={getMinDate()}
                      className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 focus:border-primary/50 focus:bg-gradient-to-r focus:from-primary/10 focus:to-accent/10 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="font-medium">Preferred Time *</Label>
                    <Select
                      value={formData.preferredTime}
                      onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                      required
                    >
                      <SelectTrigger className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 focus:border-primary/50 focus:bg-gradient-to-r focus:from-primary/10 focus:to-accent/10 transition-all duration-300">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">01:00 PM</SelectItem>
                        <SelectItem value="14:00">02:00 PM</SelectItem>
                        <SelectItem value="15:00">03:00 PM</SelectItem>
                        <SelectItem value="16:00">04:00 PM</SelectItem>
                        <SelectItem value="17:00">05:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="font-medium">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Any specific questions or concerns you'd like to discuss?"
                  rows={4}
                  className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 focus:border-primary/50 focus:bg-gradient-to-r focus:from-primary/10 focus:to-accent/10 transition-all duration-300"
                />
              </div>

              {/* Submit Button */}
              <div className="space-y-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Redirecting to payment...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Pay €10 & Book Consultation
                    </span>
                  )}
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    You'll receive a confirmation email with your unique discount code
                  </p>
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="text-green-600">✓</span> Secure payment
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-green-600">✓</span> Instant confirmation
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-green-600">✓</span> €10 credit on purchase
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2">10-Minute Session</h3>
            <p className="text-sm text-muted-foreground">
              Quick video call with our hair expert
            </p>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2">Personalized Plan</h3>
            <p className="text-sm text-muted-foreground">
              Custom treatment recommendations for your hair
            </p>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2">€10 Credit</h3>
            <p className="text-sm text-muted-foreground">
              Fee applied to your order if you purchase during call
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
