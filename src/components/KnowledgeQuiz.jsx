import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';

export default function KnowledgeQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <section id="trac-nghiem-on-tap" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-vn-black via-vn-charcoal/50 to-vn-black border-t border-vn-gold-antique/20 scroll-mt-20">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vn-charcoal border border-vn-gold/30 text-vn-gold text-xs uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5 text-vn-gold" />
            <span>Phòng Khảo Thí & Đánh Giá Năng Lực</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4">
            Trắc Nghiệm Kiến Thức Trọng Tâm Chương 6
          </h2>
          <p className="text-sm sm:text-base text-vn-ivory/75 font-light leading-relaxed">
            10 câu hỏi chuẩn đề thi học phần Chủ nghĩa Xã hội Khoa học (MLN131). Kiểm tra ngay mức độ 
            nắm vững kiến thức lý luận và thực tiễn của bạn!
          </p>
        </div>

        {/* Quiz Container */}
        {!quizCompleted ? (
          <div className="p-6 sm:p-10 rounded-3xl bg-vn-charcoal/90 border border-vn-gold-antique/30 shadow-2xl backdrop-blur-md relative">
            
            {/* Progress Header */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-vn-ivory/10 text-xs text-vn-ivory/70">
              <span className="font-semibold text-vn-gold uppercase tracking-wider">
                Câu hỏi {currentIdx + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <span>
                Điểm số hiện tại: <strong className="text-vn-gold text-sm">{score}</strong> / {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-8 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt, optIdx) => {
                let btnStyle = "bg-vn-black/70 border-vn-ivory/15 text-vn-ivory hover:border-vn-gold/50";
                
                if (isAnswered) {
                  if (optIdx === currentQ.correctAnswer) {
                    btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/20";
                  } else if (optIdx === selectedOption) {
                    btnStyle = "bg-red-950/70 border-red-500 text-red-200";
                  } else {
                    btnStyle = "bg-vn-black/40 border-vn-ivory/5 text-vn-ivory/40 opacity-50";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && optIdx === currentQ.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && optIdx === selectedOption && optIdx !== currentQ.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box (Visible after answering) */}
            {isAnswered && (
              <div className="p-4 sm:p-5 rounded-xl bg-vn-black/80 border border-vn-gold/30 mb-8 animate-in fade-in">
                <div className="flex items-center gap-2 text-xs font-semibold text-vn-gold uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-4 h-4 text-vn-gold" />
                  <span>Giải Thích Học Thuật Chuẩn Giáo Trình:</span>
                </div>
                <p className="text-xs sm:text-sm text-vn-ivory/90 leading-relaxed font-sans">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-vn-red to-vn-red-deep border border-vn-gold text-white font-medium text-xs sm:text-sm tracking-wider uppercase hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-vn-red/40"
                >
                  <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? "Câu hỏi tiếp theo" : "Xem kết quả bài thi"}</span>
                  <ArrowRight className="w-4 h-4 text-vn-gold" />
                </button>
              </div>
            )}

          </div>
        ) : (
          /* Completion Certificate Card */
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-vn-charcoal via-vn-black to-vn-charcoal border-2 border-vn-gold shadow-2xl text-center relative overflow-hidden">
            
            {/* Top decorative seal */}
            <div className="w-20 h-20 mx-auto rounded-full bg-vn-red-deep border-2 border-vn-gold flex items-center justify-center text-vn-gold mb-6 shadow-xl shadow-vn-gold/20">
              <Award className="w-10 h-10 animate-bounce" />
            </div>

            <span className="text-xs uppercase font-semibold tracking-cinematic text-vn-gold block mb-2">
              Chứng Nhận Hoàn Thành Khảo Thí
            </span>

            <h3 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
              KẾT QUẢ ÔN TẬP CHƯƠNG 6 MLN131
            </h3>

            <p className="text-xs sm:text-sm text-vn-ivory/70 mb-8 font-serif italic">
              "Vấn đề Dân tộc và Tôn giáo trong Thời kỳ Quá độ lên Chủ nghĩa Xã hội"
            </p>

            {/* Score Ring */}
            <div className="inline-flex flex-col items-center justify-center p-6 rounded-2xl bg-vn-black/70 border border-vn-gold/30 mb-8 min-w-[200px]">
              <div className="font-display font-bold text-5xl sm:text-6xl text-vn-gold">
                {score} <span className="text-2xl text-vn-ivory/50">/ {QUIZ_QUESTIONS.length}</span>
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-vn-red mt-2">
                {score >= 9 ? "Xếp loại: Xuất Sắc" : score >= 7 ? "Xếp loại: Khá Giỏi" : score >= 5 ? "Xếp loại: Đạt" : "Cần ôn tập lại"}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-vn-ivory/80 max-w-lg mx-auto mb-8 leading-relaxed font-light">
              {score >= 8 
                ? "Chúc mừng bạn! Bạn đã nắm rất vững các quan điểm kinh điển của chủ nghĩa Mác - Lênin, tư tưởng Hồ Chí Minh và chính sách dân tộc, tôn giáo của Đảng và Nhà nước ta."
                : "Bạn đã hoàn thành bài khảo thí. Hãy cuộn lên xem lại các chương lý luận và bản đồ tương tác để củng cố các điểm chưa vững trước kỳ thi nhé!"}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-3 rounded-full bg-vn-charcoal border border-vn-gold text-vn-gold hover:bg-vn-gold hover:text-vn-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại bài thi</span>
              </button>
              <a
                href="#chuong-1"
                className="px-6 py-3 rounded-full bg-vn-red hover:bg-vn-red-deep border border-vn-gold/50 text-white font-semibold text-xs tracking-wider uppercase transition-all"
              >
                Xem lại lý luận
              </a>
            </div>

          </div>
        )}

      </div>

    </section>
  );
}
