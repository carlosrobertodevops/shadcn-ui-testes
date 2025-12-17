'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const ForgotPassword03 = () => {
  const avatars = [
    { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png', fallback: 'A' },
    { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png', fallback: 'B' },
    { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png', fallback: 'C' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center bg-background px-8 py-24">
          <div className="flex w-full max-w-[520px] flex-col justify-center gap-6">
            <div className="flex w-full items-center justify-start gap-3 px-6">
              <div className="flex items-center justify-center">
                <div className="flex size-8 items-center justify-center rounded-[21.4634px] bg-primary">
                  <div className="size-[19px]" />
                </div>
              </div>
              <p className="text-left text-[20px] font-semibold leading-[26px] text-foreground">shadcn/studio</p>
            </div>

            <div className="flex w-full flex-col justify-center gap-2 px-6">
              <h2 className="text-left text-[24px] font-semibold leading-8 text-foreground">Forgot Password?</h2>
              <p className="text-left text-[16px] font-normal leading-6 text-muted-foreground">
                No worries, we’ll send you reset instructions.
              </p>
            </div>

            <div className="flex w-full flex-col items-start justify-start gap-4 px-6">
              <div className="flex w-full flex-col items-start gap-0">
                <div className="flex w-full items-center justify-between gap-2 px-1 py-1">
                  <Label className="text-left text-[14px] font-medium leading-5 text-foreground">Email address*</Label>
                </div>
                <Input
                  className="h-9 w-full rounded-lg bg-input/30 px-3 py-1 shadow-sm"
                  placeholder="Enter your email address"
                  type="email"
                />
              </div>

              <Button className="h-9 w-full rounded-lg">Send Reset Link</Button>

              <Button variant="ghost" className="h-9 w-full rounded-[10px] text-primary">
                Back to login
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-muted p-5 max-lg:hidden">
          <div className="flex h-[860px] w-[680px] flex-col justify-between rounded-[14px] bg-primary p-8">
            <div className="flex flex-col items-start gap-6">
              <h1 className="text-left text-[48px] font-bold leading-none text-primary-foreground">
                Don’t worry it happens! Resetting your password is quick and easy.
              </h1>
              <p className="text-left text-[20px] font-normal leading-7 text-primary-foreground">
                Just enter your registered email address below, and we’ll send you a secure link to reset your password.
                Follow the instructions in the email, and you’ll be back in your account in no time!
              </p>
            </div>

            <div className="relative">
              <div className="rounded-none bg-card">
                <div className="flex flex-col gap-6 px-0 py-0">
                  <div className="flex flex-col gap-5">
                    <h3 className="text-left text-[30px] font-bold leading-9 text-card-foreground">
                      Follow the instructions
                    </h3>
                    <div className="flex flex-col gap-5">
                      <p className="text-left text-[18px] font-normal leading-7 text-card-foreground">
                        If you don’t see the email in your inbox, be sure to check your spam or junk folder.
                      </p>

                      <div className="flex w-full items-end justify-start">
                        <div className="flex items-center">
                          {avatars.map((a, idx) => (
                            <div key={a.src} className={idx === 0 ? '' : '-ml-5'}>
                              <Avatar>
                                <AvatarImage src={a.src} className="size-12 border-2 border-border" />
                                <AvatarFallback>{a.fallback}</AvatarFallback>
                              </Avatar>
                            </div>
                          ))}
                          <div className="-ml-5">
                            <Avatar>
                              <AvatarImage className="size-12 border-2 border-border" />
                              <AvatarFallback className="bg-muted text-[12px] font-normal leading-4 text-foreground">
                                +3695
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute right-0 top-0 z-10 flex size-[60px] items-center justify-center">
                <div className="flex size-[60px] items-center justify-center rounded-[14px] bg-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};