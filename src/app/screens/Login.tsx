import { useState, FormEvent } from 'react';
import { Heart, ArrowRight, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { START_DATE } from '../data/mockData';

export function Login() {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [isShake, setIsShake] = useState(false);

  // Parse START_DATE ('YYYY-MM-DD') for display or validation logic if needed
  // For this simple login, we just check string equality on the date input value.

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (date === START_DATE) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      setError('That date doesn\'t seem right...');
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] aspect-square rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] aspect-square rounded-full bg-primary/5 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_8px_32px_rgba(232,162,162,0.15)] relative z-10 border border-white/50">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            To confirm it's you, please tell me when our story began.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80 ml-1">
              The day we first met
            </label>
            <div className={`relative transition-transform duration-300 ${isShake ? 'translate-x-[-10px]' : ''}`}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                <Calendar className="w-5 h-5" />
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setError('');
                }}
                className={`w-full pl-12 pr-4 py-4 rounded-[20px] bg-white border-2 outline-none transition-all duration-300 ${error
                    ? 'border-red-300 text-red-600 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                    : 'border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:bg-primary/5'
                  }`}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 ml-1 animate-in slide-in-from-top-1 fade-in duration-300">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-[20px] bg-primary text-white font-medium shadow-[0_8px_24px_rgba(232,162,162,0.25)] hover:shadow-[0_12px_32px_rgba(232,162,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Enter Album</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground/50">
            Just a little check to keep our memories safe ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
