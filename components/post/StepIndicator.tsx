import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
  onStepClick?: (stepIndex: number) => void;
}

export function StepIndicator({
  currentStep,
  steps,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="w-full select-none">
      <div className="flex items-center justify-between">
        {steps.map((label, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <React.Fragment key={idx}>
              <div
                onClick={() => isCompleted && onStepClick && onStepClick(stepNumber)}
                className={cn(
                  'flex items-center gap-2.5',
                  isCompleted && onStepClick ? 'cursor-pointer group' : ''
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-heading font-semibold text-small transition-all duration-200 border',
                    isCompleted
                      ? 'bg-primary text-primary-foreground border-primary'
                      : isCurrent
                      ? 'bg-primary/10 text-primary border-primary ring-2 ring-primary/20'
                      : 'bg-surface border-border text-text-muted'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                <div className="hidden sm:block">
                  <p
                    className={cn(
                      'text-small font-medium transition-colors',
                      isCurrent
                        ? 'text-text font-semibold'
                        : isCompleted
                        ? 'text-text-secondary group-hover:text-text'
                        : 'text-text-muted'
                    )}
                  >
                    {label}
                  </p>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-px mx-3 sm:mx-4 transition-colors',
                    stepNumber < currentStep ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

