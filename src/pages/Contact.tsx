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
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
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

    const endpoint =
      import.meta.env.VITE_CONTACT_ENDPOINT || "https://api.web3forms.com/submit";
    const accessKey = import.meta.env.VITE_CONTACT_ACCESS_KEY;

    if (!accessKey) {
      toast({
        title: "Missing contact configuration",
        description:
          "Set VITE_CONTACT_ACCESS_KEY in your environment to enable message delivery.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          topic: formData.topic,
          message: formData.message,
          subject: `New contact from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message");
      }

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
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong sending your message.";
      toast({
        title: "Unable to deliver message",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-padding">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-20 space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/50 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4 text-accent" />
              Contact Us
            </div>
            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Let's discuss how Rodent Inc. can power your next innovation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in-up">
              <div className="card-premium">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  Reach out directly or fill in the form. We're here to help build
                  the future together.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-tech" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">Email</div>
                      <a
                        href="mailto:anesu@rodent.co.zw"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        anesu@rodent.co.zw
                      </a>
                      <div className="text-sm text-muted-foreground">Alternative contact</div>
                      <a
                        href="mailto:vulamachiri@rodent.co.zw"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        vulamachiri@rodent.co.zw
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-energy" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">Phone</div>
                      <a
                        href="tel:+263787008238"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        +263 78 700 8238
                      </a>
                      <div className="text-sm text-muted-foreground">Alternative</div>
                      <a
                        href="tel:+263711950555"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        +263 71 195 0555
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
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

              <div className="card-premium">
                <h3 className="text-lg font-semibold mb-4">What we can help with</h3>
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
            <div className="card-premium animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
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
                    className="h-12"
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
                    className="h-12"
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
                      className="h-12"
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
                      className="h-12"
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
                    <SelectTrigger className="h-12">
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
                    rows={5}
                    required
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 rounded-full"
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
