import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Zap, ZapOff } from 'lucide-react';

const ScheduleViewer = () => {
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = ['11', '12', '13', '14', '15', '16', '17'];
  
  // Sample schedule data (in hours, 24h format)
  const scheduleData = [
    { start: 6, end: 10, type: 'outage' },
    { start: 14, end: 18, type: 'outage' },
  ];

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="glass rounded-2xl p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">Load-Shedding Schedule</h3>
          <p className="text-sm text-muted-foreground">Area 12 - Bulawayo</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setSelectedDay(Math.min(6, selectedDay + 1))}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Day Selector */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={day}
            onClick={() => setSelectedDay(index)}
            className={`p-3 rounded-lg text-center transition-all ${
              selectedDay === index
                ? 'bg-gradient-to-br from-energy/20 to-accent/20 border border-energy/30'
                : 'glass-hover'
            }`}
          >
            <div className="text-xs text-muted-foreground mb-1">{day}</div>
            <div className="text-lg font-semibold">{dates[index]}</div>
          </button>
        ))}
      </div>

      {/* Current Status */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-tech/10 border border-tech/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-tech/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-tech" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Current Status</div>
            <div className="font-semibold text-tech">Power Available</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Next Outage</div>
          <div className="font-semibold">Today, 14:00</div>
        </div>
      </div>

      {/* Timeline View */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-muted-foreground">Today's Timeline</div>
        <div className="relative h-20 rounded-lg bg-secondary/50 overflow-hidden">
          {/* Hour markers */}
          <div className="absolute inset-0 flex">
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex-1 border-l border-border/30 flex items-end justify-center pb-1"
              >
                {hour % 6 === 0 && (
                  <span className="text-xs text-muted-foreground">{hour}:00</span>
                )}
              </div>
            ))}
          </div>

          {/* Outage blocks */}
          {scheduleData.map((block, index) => (
            <div
              key={index}
              className="absolute top-0 bottom-6 bg-gradient-to-r from-energy/80 to-destructive/80 border-y border-destructive/50 flex items-center justify-center"
              style={{
                left: `${(block.start / 24) * 100}%`,
                width: `${((block.end - block.start) / 24) * 100}%`,
              }}
            >
              <div className="flex items-center gap-1 text-xs font-medium text-primary-foreground">
                <ZapOff className="w-3 h-3" />
                Outage
              </div>
            </div>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-2 pt-2">
          {scheduleData.map((block, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg glass-hover"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-energy animate-glow" />
                <span className="font-medium">
                  {String(block.start).padStart(2, '0')}:00 - {String(block.end).padStart(2, '0')}:00
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {block.end - block.start} hours
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button variant="premium" className="flex-1">
          Download Schedule
        </Button>
        <Button variant="outline" className="flex-1">
          Set Reminder
        </Button>
      </div>
    </div>
  );
};

export default ScheduleViewer;
