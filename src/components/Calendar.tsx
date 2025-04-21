import React, { useMemo, useState, useCallback } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  parse,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { CalendarDay } from '../types';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
] as const;

const MonthPickerButton = React.memo(({ month, index, currentMonth, onClick }: {
  month: string;
  index: number;
  currentMonth: Date;
  onClick: (index: number) => void;
}) => (
  <button
    onClick={() => onClick(index)}
    className={`p-2 text-sm rounded-lg transition-colors ${
      currentMonth.getMonth() === index
        ? 'bg-primary-500 text-white'
        : 'hover:bg-primary-50 text-secondary-600'
    }`}
  >
    {month}
  </button>
));

const YearPickerButton = React.memo(({ year, currentYear, onClick }: {
  year: number;
  currentYear: number;
  onClick: (year: number) => void;
}) => (
  <button
    onClick={() => onClick(year)}
    className={`p-2 text-sm rounded-lg transition-colors ${
      currentYear === year
        ? 'bg-primary-500 text-white'
        : 'hover:bg-primary-50 text-secondary-600'
    }`}
  >
    {year}
  </button>
));

const CalendarCell = React.memo(({ day, selectedDate, onDateClick }: {
  day: CalendarDay;
  selectedDate: Date;
  onDateClick: (day: CalendarDay) => void;
}) => (
  <div
    className={`relative bg-white p-3 min-h-[120px] cursor-pointer transition-colors
      ${!day.isCurrentMonth ? 'opacity-40' : ''}
      ${isSameDay(day.date, selectedDate) 
        ? 'border-2 border-primary-500' 
        : 'hover:bg-primary-50 border border-secondary-200'
      }
    `}
    onClick={() => onDateClick(day)}
  >
    <div className="flex flex-col h-full">
      <div 
        className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 ${
          day.isToday 
            ? 'bg-primary-500 text-white' 
            : day.notes.length > 0 
            ? 'bg-primary-50 text-primary-700'
            : ''
        }`}
      >
        <span className="text-sm font-medium">
          {format(day.date, 'd')}
        </span>
      </div>
      
      <div className="flex-grow overflow-hidden space-y-1">
        {day.notes.slice(0, 3).map((note) => (
          <div 
            key={note.id}
            className="text-xs truncate bg-primary-50 text-primary-700 px-2 py-1 rounded-md hover:bg-primary-100 transition-colors"
            title={note.content}
          >
            {note.content}
          </div>
        ))}
        {day.notes.length > 3 && (
          <div className="text-xs text-secondary-500 px-2 font-medium">
            +{day.notes.length - 3} more
          </div>
        )}
      </div>
    </div>
  </div>
));

export function Calendar() {
  const { selectedDate, setSelectedDate, notesMap } = useNotes();
  const [currentMonth, setCurrentMonth] = useState(selectedDate);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  
  const currentYear = currentMonth.getFullYear();
  const years = useMemo(() => 
    Array.from({ length: 10 }, (_, i) => currentYear - 5 + i),
    [currentYear]
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(prev => subMonths(prev, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(prev => addMonths(prev, 1));
  }, []);

  const handleMonthYearSelect = useCallback((month: number, year: number) => {
    setCurrentMonth(new Date(year, month));
    setIsMonthPickerOpen(false);
  }, []);

  const handleDateClick = useCallback((day: CalendarDay) => {
    setSelectedDate(day.date);
  }, [setSelectedDate]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    const startDayOfWeek = getDay(monthStart);
    
    const previousMonthDays: Date[] = [];
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      previousMonthDays.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), -i));
    }
    
    const endDayOfWeek = getDay(monthEnd);
    
    const nextMonthDays: Date[] = [];
    for (let i = 1; i < 7 - endDayOfWeek; i++) {
      nextMonthDays.push(new Date(monthEnd.getFullYear(), monthEnd.getMonth() + 1, i));
    }
    
    const allDays = [...previousMonthDays, ...days, ...nextMonthDays];
    
    return allDays.map((date) => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const notes = notesMap.get(formattedDate) || [];
      
      return {
        date,
        isCurrentMonth: isSameMonth(date, currentMonth),
        isToday: isToday(date),
        notes
      } as CalendarDay;
    });
  }, [currentMonth, notesMap]);

  const calendarWeeks = useMemo(() => {
    const weeks: CalendarDay[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    return weeks;
  }, [calendarDays]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="relative">
          <button
            onClick={() => setIsMonthPickerOpen(prev => !prev)}
            className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            {format(currentMonth, 'MMMM yyyy')}
          </button>
          
          {isMonthPickerOpen && (
            <div className="absolute top-full left-0 mt-2 p-4 bg-white rounded-xl shadow border border-secondary-200 z-10 w-[280px] animate-fadeIn">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {months.map((month, index) => (
                  <MonthPickerButton
                    key={month}
                    month={month}
                    index={index}
                    currentMonth={currentMonth}
                    onClick={(index) => handleMonthYearSelect(index, currentYear)}
                  />
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {years.map(year => (
                  <YearPickerButton
                    key={year}
                    year={year}
                    currentYear={currentYear}
                    onClick={(year) => handleMonthYearSelect(currentMonth.getMonth(), year)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg hover:bg-primary-50 text-secondary-600 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              setCurrentMonth(new Date());
              setSelectedDate(new Date());
            }}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            Today
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg hover:bg-primary-50 text-secondary-600 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-secondary-200 rounded-xl overflow-hidden">
        {weekDays.map((day) => (
          <div key={day} className="bg-secondary-50 p-3 text-center">
            <span className="text-sm font-semibold text-secondary-600">{day}</span>
          </div>
        ))}
        
        {calendarWeeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day) => (
              <CalendarCell
                key={format(day.date, 'yyyy-MM-dd')}
                day={day}
                selectedDate={selectedDate}
                onDateClick={handleDateClick}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}