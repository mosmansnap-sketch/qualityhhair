import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, Mail, User, Sparkles } from 'lucide-react';
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
    setIsSubmitting(true);

    // Create calendar event data
    const eventData = {
      title: `Hair Consultation - ${formData.name}`,
      description: `
Hair Type: ${formData.hairType}
Hair Concerns: ${formData.currentHairConcerns}
Phone: ${formData.phone}
Email: ${formData.email}
Additional Notes: ${formData.additionalNotes || 'None'}
      `.trim(),
      start: formData.preferredDate,
      duration: 30, // 30 minutes
    };

    // In a real implementation, you would:
    // 1. Send this to your backend API
    // 2. Create a calendar event via Google Calendar API or similar
    // 3. Send confirmation email to customer
    // 4. Send notification to you via email/WhatsApp

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For now, we'll create a Google Calendar link that pre-fills the event
    const calendarUrl = createGoogleCalendarUrl(formData);
    
    // Show success message
    toast.success('Consultation Request Received!', {
      description: 'We\'ll contact you shortly to confirm your appointment.',
      duration: 5000,
    });

    // Open calendar link in new tab
    window.open(calendarUrl, '_blank');

    // Send WhatsApp notification (optional)
    const whatsappMessage = `New Consultation Booking:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nHair Type: ${formData.hairType}\nConcerns: ${formData.currentHairConcerns}\nPreferred Date: ${formData.preferredDate}\nPreferred Time: ${formData.preferredTime}`;
    
    console.log('Consultation Data:', formData);
    console.log('Calendar Event:', eventData);
    
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      hairType: '',
      currentHairConcerns: '',
      preferredDate: '',
      preferredTime: '',
      additionalNotes: ''
    });
  };

  const createGoogleCalendarUrl = (data: typeof formData) => {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const title = encodeURIComponent(`Hair Consultation - ${data.name}`);
    const details = encodeURIComponent(`
Hair Type: ${data.hairType}
Concerns: ${data.currentHairConcerns}
Phone: ${data.phone}
Email: ${data.email}
${data.additionalNotes ? `Notes: ${data.additionalNotes}` : ''}
    `.trim());
    
    // Format date for Google Calendar (YYYYMMDDTHHmmss)
    const dateTime = data.preferredDate ? `${data.preferredDate.replace(/-/g, '')}T${data.preferredTime.replace(/:/g, '')}00` : '';
    
    return `${baseUrl}&text=${title}&details=${details}&dates=${dateTime}/${dateTime}`;
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 border-2 border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+31 6 12345678"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
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
                />
              </div>

              {/* Hair Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="hairType">Hair Type / Texture *</Label>
                  <Select
                    value={formData.hairType}
                    onValueChange={(value) => setFormData({ ...formData, hairType: value })}
                    required
                  >
                    <SelectTrigger>
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
                  <Label htmlFor="concerns">Main Hair Concerns *</Label>
                  <Select
                    value={formData.currentHairConcerns}
                    onValueChange={(value) => setFormData({ ...formData, currentHairConcerns: value })}
                    required
                  >
                    <SelectTrigger>
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

              {/* Appointment Scheduling */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Preferred Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time *</Label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                    required
                  >
                    <SelectTrigger>
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

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Any specific questions or concerns you'd like to discuss?"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="h-5 w-5" />
                      </motion.div>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Book Consultation (€10)
                    </span>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  You'll receive a confirmation email within 24 hours. The €10 fee can be applied toward your first purchase.
                </p>
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
            <h3 className="mb-2">30-Minute Session</h3>
            <p className="text-sm text-muted-foreground">
              Personal video call with our hair expert
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
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2">Ongoing Support</h3>
            <p className="text-sm text-muted-foreground">
              Follow-up guidance after your consultation
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
