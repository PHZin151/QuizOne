import { useEffect, useState } from 'react';

const questions = [
  { question: 'Qual é a principal característica do Sonic?', options: ['Sua supervelocidade', 'Sua força para voar', 'Sua capacidade de ficar invisível', 'Sua habilidade de nadar'], answer: 0, fact: 'Sonic é conhecido por correr em velocidades incríveis!' },
  { question: 'Quem é o melhor amigo de Sonic e tem duas caudas?', options: ['Knuckles', 'Tails', 'Shadow', 'Eggman'], answer: 1, fact: 'Miles “Tails” Prower consegue voar girando suas duas caudas.' },
  { question: 'Quem costuma ser o principal vilão das aventuras de Sonic?', options: ['Tails', 'Amy', 'Dr. Eggman', 'Cream'], answer: 2, fact: 'Dr. Eggman é o cientista que vive tentando derrotar Sonic.' },
  { question: 'Qual item dourado Sonic costuma coletar?', options: ['Estrelas', 'Anéis', 'Moedas azuis', 'Cristais verdes'], answer: 1, fact: 'Os anéis são um dos símbolos mais conhecidos dos jogos Sonic.' },
  { question: 'Qual personagem é conhecido por seus punhos poderosos?', options: ['Knuckles', 'Tails', 'Amy', 'Cream'], answer: 0, fact: 'Knuckles é forte e protege a Master Emerald.' },
  { question: 'Qual é a cor mais associada ao Sonic?', options: ['Vermelho', 'Verde', 'Azul', 'Amarelo'], answer: 2, fact: 'O ouriço azul é famoso por sua cor e velocidade.' },
  { question: 'Qual personagem usa um martelo chamado Piko Piko Hammer?', options: ['Rouge', 'Amy Rose', 'Blaze', 'Shadow'], answer: 1, fact: 'Amy Rose é uma personagem corajosa e determinada.' },
  { question: 'Como é conhecido o grupo de pedras preciosas especiais do universo Sonic?', options: ['Chaos Emeralds', 'Power Stones', 'Magic Rings', 'Star Gems'], answer: 0, fact: 'As Chaos Emeralds possuem grande poder no universo Sonic.' },
  { question: 'Que tipo de animal é Sonic?', options: ['Raposa', 'Equidna', 'Ouriço', 'Gato'], answer: 2, fact: 'Sonic é um ouriço antropomórfico.' },
  { question: 'Qual personagem é frequentemente apresentado como rival de Sonic?', options: ['Shadow', 'Big', 'Omochao', 'Cheese'], answer: 0, fact: 'Shadow é conhecido como o ouriço negro e rival de Sonic.' }
];

function Header({ bestScore }) {
  return <header className="topbar"><a className="brand" href="#inicio" aria-label="Quiz Sonic início"><span className="brand-icon">💨</span> QUIZ SONIC</a><div className="best-score">🏆 Recorde: <strong>{bestScore}</strong>/100</div></header>;
}

function StartScreen({ onStart, bestScore }) {
  return <main className="hero" id="inicio"><div className="hero-art" aria-hidden="true"><div className="speed-lines">〰</div><div className="sonic-orb">🦔</div><span className="ring ring-one">◎</span><span className="ring ring-two">◎</span><span className="spark">✦</span></div><section className="intro"><p className="eyebrow">ESTÁ PRONTO PARA O DESAFIO?</p><h1>Mostre que você é<br /><span>SUPERSONIC!</span></h1><p className="description">Teste seus conhecimentos sobre Sonic e seus amigos. São 10 perguntas para descobrir se você é um verdadeiro fã!</p><div className="stats"><div><strong>10</strong><span>Perguntas</span></div><div><strong>100</strong><span>Pontos possíveis</span></div><div><strong>🏆 {bestScore}</strong><span>Seu recorde</span></div></div><button className="primary-button" onClick={onStart}>COMEÇAR QUIZ <span>➜</span></button><p className="small-note">Prepare-se... velocidade máxima!</p></section></main>;
}

function QuizScreen({ index, selected, answered, score, onSelect, onNext }) {
  const current = questions[index];
  const progress = ((index + 1) / questions.length) * 100;
  return <main className="quiz-panel"><div className="quiz-meta"><span>PERGUNTA {index + 1} <span className="muted">/ {questions.length}</span></span><span className="points">⭐ {score} pontos</span></div><div className="progress-track"><div className="progress-fill" style={{ width: progress + '%' }} /></div><p className="eyebrow">DESAFIO SONIC</p><h2>{current.question}</h2><div className="options">{current.options.map((option, i) => { const isCorrect = answered && i === current.answer; const isWrong = answered && i === selected && i !== current.answer; return <button key={option} className={'option' + (isCorrect ? ' correct' : '') + (isWrong ? ' wrong' : '')} onClick={() => onSelect(i)} disabled={answered}><span className="option-letter">{String.fromCharCode(65 + i)}</span><span>{option}</span><span className="option-mark">{isCorrect ? '✓' : isWrong ? '✕' : '›'}</span></button>; })}</div>{answered && <div className="feedback"><strong>{selected === current.answer ? 'Mandou bem! ⚡' : 'Quase lá! 💙'}</strong><p>{current.fact}</p></div>}<div className="quiz-footer"><span>Escolha uma resposta</span><button className="primary-button next-button" onClick={onNext} disabled={!answered}>{index === questions.length - 1 ? 'VER RESULTADO' : 'PRÓXIMA'} <span>➜</span></button></div></main>;
}

function ResultScreen({ score, bestScore, onRestart }) {
  const perfect = score === 100;
  return <main className="result-panel"><div className="result-icon">{perfect ? '🏆' : '⚡'}</div><p className="eyebrow">FIM DE JOGO!</p><h1>{perfect ? 'INCRÍVEL, VELOCISTA!' : 'DESAFIO CONCLUÍDO!'}</h1><p className="description">Você terminou o Quiz Sonic. Que tal tentar novamente e superar sua pontuação?</p><div className="final-score"><span>SUA PONTUAÇÃO</span><strong>{score}<small>/100</small></strong></div><p className="record">🏆 Seu recorde: <strong>{bestScore}</strong> pontos</p><button className="primary-button" onClick={onRestart}>JOGAR NOVAMENTE <span>↻</span></button></main>;
}

export default function App() {
  const [screen, setScreen] = useState('start');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem('sonicQuizBest') || 0));

  useEffect(() => {
    localStorage.setItem('sonicQuizBest', String(bestScore));
  }, [bestScore]);

  function startQuiz() {
    setIndex(0); setSelected(null); setAnswered(false); setScore(0); setScreen('quiz');
  }

  function chooseAnswer(optionIndex) {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === questions[index].answer) {
      const newScore = score + 10;
      setScore(newScore);
      if (newScore > bestScore) setBestScore(newScore);
    }
  }

  function nextQuestion() {
    if (!answered) return;
    if (index === questions.length - 1) setScreen('result');
    else { setIndex(index + 1); setSelected(null); setAnswered(false); }
  }

  return <div className="app-shell"><Header bestScore={bestScore} />{screen === 'start' && <StartScreen onStart={startQuiz} bestScore={bestScore} />}{screen === 'quiz' && <QuizScreen index={index} selected={selected} answered={answered} score={score} onSelect={chooseAnswer} onNext={nextQuestion} />}{screen === 'result' && <ResultScreen score={score} bestScore={bestScore} onRestart={startQuiz} />}<footer className="site-footer">FEITO PARA QUEM AMA VELOCIDADE <span>💙</span></footer></div>;
}