import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const Contact = () => {
  usePageMetadata(
    "Contact",
    "Contact Rodent Inc. to collaborate on developer tools, energy intelligence, fintech, or hardware projects."
  );
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    topic: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      topic: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how Rodent Inc. can power your next innovation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in">
              <div className="glass rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-bold">Contact Information</h2>
                <p className="text-muted-foreground">
                  Reach out directly or fill in the form. We're here to help build
                  the future together.
                </p>

                <div className="space-y-6 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-tech/10 border border-tech/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-tech" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">Email</div>
                      <a
                        href="mailto:anesu@rodent.co.zw"
                        className="text-muted-foreground hover:text-tech transition-colors"
                      >
                        anesu@rodent.co.zw
                      </a>
                      <div className="text-sm text-muted-foreground">Alternative contact</div>
                      <a
                        href="mailto:vulamachiri@rodent.co.zw"
                        className="text-muted-foreground hover:text-tech transition-colors"
                      >
                        vulamachiri@rodent.co.zw
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-energy/10 border border-energy/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-energy" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">Phone</div>
                      <a
                        href="tel:+263787008238"
                        className="text-muted-foreground hover:text-energy transition-colors"
                      >
                        +263 78 700 8238
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">Location</div>
                      <div className="text-muted-foreground">
                        Bulawayo, Zimbabwe
                        <br />
                        SADC Region
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8 space-y-4">
                <h3 className="text-xl font-semibold">What we can help with</h3>
                <ul className="space-y-3">
                  {[
                    "API integration & developer tools",
                    "Energy intelligence solutions",
                    "Fintech & insurance platforms",
                    "Custom enterprise solutions",
                    "Partnership opportunities",
                    "Media & press inquiries",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass rounded-2xl p-8 animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+263 ..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic *</Label>
                  <Select
                    value={formData.topic}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, topic: value }))
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dev-tools">Developer Tools</SelectItem>
                      <SelectItem value="energy">Energy Solutions</SelectItem>
                      <SelectItem value="fintech">Fintech & Insurance</SelectItem>
                      <SelectItem value="partnerships">Partnerships</SelectItem>
                      <SelectItem value="media">Media & Press</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
