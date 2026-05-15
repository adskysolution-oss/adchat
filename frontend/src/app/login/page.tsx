"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, ShieldCheck, Mail, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleBack = () => setStep("phone");
  const handleContinue = () => setStep("otp");

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass dark:glass-dark rounded-3xl p-8 shadow-premium relative z-10"
      >
        <AnimatePresence mode="wait">
          {step === "phone" ? (
            <motion.div
              key="phone-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Welcome to Sky Verse</h2>
                <p className="text-foreground/60">The next generation of secure communication</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full h-14 bg-bg-light/50 dark:bg-bg-dark/50 border border-border dark:border-border-dark rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleContinue}
                  className="w-full h-14 premium-gradient text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border dark:border-border-dark"></div>
                <span className="flex-shrink mx-4 text-foreground/30 text-xs font-bold uppercase tracking-widest">Or login with</span>
                <div className="flex-grow border-t border-border dark:border-border-dark"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="h-12 border border-border dark:border-border-dark rounded-xl flex items-center justify-center gap-2 hover:bg-surface dark:hover:bg-surface-dark transition-colors text-sm font-medium">
                  <Mail className="w-4 h-4" /> Email
                </button>
                <button className="h-12 border border-border dark:border-border-dark rounded-xl flex items-center justify-center gap-2 hover:bg-surface dark:hover:bg-surface-dark transition-colors text-sm font-medium">
                  <ShieldCheck className="w-4 h-4" /> Passkey
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="otp-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button 
                onClick={handleBack}
                className="p-2 -ml-2 text-foreground/60 hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium"
              >
                <ChevronLeft className="w-4 h-4" /> Change Number
              </button>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Verify Account</h2>
                <p className="text-foreground/60">We sent a 6-digit code to <span className="text-foreground font-semibold">{phone}</span></p>
              </div>

              <div className="flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-12 h-14 text-center text-xl font-bold bg-bg-light/50 dark:bg-bg-dark/50 border border-border dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                ))}
              </div>

              <button className="w-full h-14 premium-gradient text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                Verify & Continue
              </button>

              <p className="text-center text-foreground/60 text-sm">
                Didn't receive code? <button className="text-primary font-bold hover:underline">Resend OTP</button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-foreground/40 text-xs">
          By continuing, you agree to Sky Verse's <br />
          <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  );
}
