"use client";

import React, { useEffect, useState, useRef } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface OTPCalculatorProps {
  className?: string;
}

const OTPCalculator: React.FC<OTPCalculatorProps> = ({ className }) => {
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set initial focus
    firstInputRef.current?.focus();

    // Handle keydown for numbers and backspace
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputElement = e.target instanceof HTMLInputElement;
      
      // Handle backspace
      if (e.key === 'Backspace' && !isInputElement) {
        e.preventDefault();
        setValue(prev => prev.slice(0, -1));
        firstInputRef.current?.focus();
        return;
      }

      // Handle numbers
      const isNumber = /^[0-9]$/.test(e.key);
      if (isNumber && !isInputElement) {
        e.preventDefault();
        setValue(prev => {
          const newValue = prev + e.key;
          return newValue.slice(0, 6);
        });
        firstInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (value.length === 6) {
      const digits = value.split('').map(Number);
      const calculatedResult = (digits[0] * digits[1]) + digits[3] + digits[5];
      setResult(calculatedResult);
    } else {
      setResult(0);
    }
  }, [value]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-center font-semibold text-2xl">LazyCal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-8">
          <div>
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} ref={firstInputRef} />
              </InputOTPGroup>
              <InputOTPSeparator>-</InputOTPSeparator>
              <InputOTPGroup>
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator>-</InputOTPSeparator>
              <InputOTPGroup>
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator>-</InputOTPSeparator>
              <InputOTPGroup>
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator>-</InputOTPSeparator>
              <InputOTPGroup>
                <InputOTPSlot index={4} />
              </InputOTPGroup>
              <InputOTPSeparator>-</InputOTPSeparator>
              <InputOTPGroup>
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-lg font-medium">Result:</div>
            <div className="text-6xl font-bold">
              {result}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPCalculator;