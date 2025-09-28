import {
  ArrowRight,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Compass,
  Library,
  ListChecks,
  LucideIcon,
  Plus,
  Settings,
  Timer,
  X,
} from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import './App.css';

const navItems: { label: string; icon: LucideIcon; isActive?: boolean }[] = [
  { label: '概览', icon: Compass, isActive: true },
  { label: '课程', icon: BookOpen },
  { label: '任务', icon: ListChecks },
  { label: '资料库', icon: Library },
  { label: '日程', icon: Calendar },
  { label: '设置', icon: Settings },
];

function App() {
  const [activeNav, setActiveNav] = useState(navItems[0].label);
  const [todayHighlights, setTodayHighlights] = useState(
    () =>
      [
        { title: 'MUE #0501', subtitle: 'STM32F407 ECH | LWP 调参', tags: ['控制', '嵌入式'], progress: 62 },
        { title: 'MUE #0502', subtitle: 'BHT70 仿真 | 资料整理', tags: ['仿真', '复盘'], progress: 38 },
        { title: 'MUE #0903', subtitle: 'Buck 200kHz 设计 Review', tags: ['硬件', '迭代'], progress: 73 },
      ] as {
        title: string;
        subtitle: string;
        tags: string[];
        progress: number;
      }[],
  );
  const [highlightDraft, setHighlightDraft] = useState({
    title: '',
    subtitle: '',
    tags: '',
    progress: 50,
  });
  const [isHighlightFormOpen, setHighlightFormOpen] = useState(false);
  const [reviewList, setReviewList] = useState(
    () =>
      [
        { title: '待复习 · 信号与系统', detail: '章节 3：卷积与响应', due: '今日 21:30', done: false },
        { title: 'DoD 检查点', detail: 'MUE #0501 仿真记录上传', due: '明日 09:00', done: false },
        { title: '资源再梳理', detail: 'Buck 设计资料包整理', due: '周四 18:00', done: false },
      ] as { title: string; detail: string; due: string; done: boolean }[],
  );
  const [reviewDraft, setReviewDraft] = useState({ title: '', detail: '', due: '' });
  const [knowledgeTree, setKnowledgeTree] = useState(
    () =>
      [
        {
          title: '数模协同',
          capsules: ['建模', '仿真', '调参'],
          items: ['MUE #0501 波形对照', 'MATLAB 优化脚本', '控制器参数表'],
        },
        {
          title: '电源设计',
          capsules: ['Buck', '磁性件', '效率'],
          items: ['损耗模型 V2', 'Spice 数据库', '实验记录 0903'],
        },
      ] as { title: string; capsules: string[]; items: string[] }[],
  );
  const [knowledgeDraft, setKnowledgeDraft] = useState({
    branchChoice: '数模协同',
    customBranch: '',
    item: '',
  });
  const [isKnowledgeFormOpen, setKnowledgeFormOpen] = useState(false);
  const [isReviewFormOpen, setReviewFormOpen] = useState(false);
  const [focusCountdown, setFocusCountdown] = useState<number | null>(null);
  const [isFocusRunning, setFocusRunning] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (!isFocusRunning || focusCountdown === null) {
      return undefined;
    }
    if (focusCountdown <= 0) {
      setFocusRunning(false);
      setFocusCountdown(null);
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setFocusCountdown((prev) => (prev ? prev - 1 : prev));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [focusCountdown, isFocusRunning]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000 * 30);
    return () => window.clearInterval(timer);
  }, []);

  const focusLabel = useMemo(() => {
    if (!isFocusRunning || focusCountdown === null) {
      return '开始专注 45′';
    }
    const minutes = Math.floor(focusCountdown / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(focusCountdown % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [focusCountdown, isFocusRunning]);

  const handleHighlightChange = (field: keyof typeof highlightDraft, value: string | number) => {
    setHighlightDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleReviewChange = (field: keyof typeof reviewDraft, value: string) => {
    setReviewDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleKnowledgeChange = (field: keyof typeof knowledgeDraft, value: string) => {
    setKnowledgeDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleHighlightSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!highlightDraft.title.trim()) {
      return;
    }
    setTodayHighlights((prev) => [
      {
        title: highlightDraft.title.trim(),
        subtitle: highlightDraft.subtitle.trim(),
        tags: highlightDraft.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        progress: Number(highlightDraft.progress),
      },
      ...prev,
    ]);
    setHighlightDraft({ title: '', subtitle: '', tags: '', progress: 50 });
    setHighlightFormOpen(false);
  };

  const handleReviewSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reviewDraft.title.trim() || !reviewDraft.due.trim()) {
      return;
    }
    setReviewList((prev) => [
      {
        title: reviewDraft.title.trim(),
        detail: reviewDraft.detail.trim(),
        due: reviewDraft.due.trim(),
        done: false,
      },
      ...prev,
    ]);
    setReviewDraft({ title: '', detail: '', due: '' });
    setReviewFormOpen(false);
  };

  const handleKnowledgeSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const branchName =
      knowledgeDraft.branchChoice === '__custom'
        ? knowledgeDraft.customBranch.trim()
        : knowledgeDraft.branchChoice;
    if (!knowledgeDraft.item.trim() || !branchName) {
      return;
    }
    setKnowledgeTree((prev) => {
      const branchIndex = prev.findIndex((branch) => branch.title === branchName);
      if (branchIndex === -1) {
        return [
          ...prev,
          {
            title: branchName,
            capsules: [],
            items: [knowledgeDraft.item.trim()],
          },
        ];
      }
      const clone = [...prev];
      clone[branchIndex] = {
        ...clone[branchIndex],
        items: [knowledgeDraft.item.trim(), ...clone[branchIndex].items],
      };
      return clone;
    });
    setKnowledgeDraft((prev) => ({
      branchChoice: prev.branchChoice === '__custom' ? branchName : prev.branchChoice,
      customBranch: '',
      item: '',
    }));
    setKnowledgeFormOpen(false);
  };

  const toggleReviewDone = (title: string) => {
    setReviewList((prev) =>
      prev.map((item) =>
        item.title === title
          ? {
              ...item,
              done: !item.done,
            }
          : item,
      ),
    );
  };

  const handleHighlightProgressChange = (
    title: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(event.target.value);
    setTodayHighlights((prev) =>
      prev.map((item) => (item.title === title ? { ...item, progress: value } : item)),
    );
  };

  const handleRemoveHighlight = (title: string) => {
    setTodayHighlights((prev) => prev.filter((item) => item.title !== title));
  };

  const handleStartFocus = () => {
    if (isFocusRunning) {
      setFocusRunning(false);
      setFocusCountdown(null);
      return;
    }
    const minutes45 = 45 * 60;
    setFocusCountdown(minutes45);
    setFocusRunning(true);
  };

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    }).format(now);
  }, [now]);

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="主导航">
        <div className="brand">
          <div className="logo">技共</div>
          <span className="brand-text">TECH COMMONS</span>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    className={`nav-button${activeNav === item.label ? ' is-active' : ''}`}
                    onClick={() => setActiveNav(item.label)}
                  >
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button type="button" className="focus-button" onClick={handleStartFocus}>
            <Timer aria-hidden="true" />
            <span>{focusLabel}</span>
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="top-bar">
          <div>
            <p className="subtitle">{formattedDate}</p>
            <h1 className="page-title">技术小天地 Dashboard</h1>
          </div>
          <button type="button" className="icon-button" aria-label="查看提醒">
            <Bell aria-hidden="true" />
          </button>
        </header>

        <section className="card section">
          <div className="section-header">
            <div className="section-title">
              <span className="capsule">今日三件事</span>
              <h2>今日目标推进</h2>
            </div>
            <div className="section-actions">
              <button type="button" className="section-action" onClick={() => setHighlightFormOpen((prev) => !prev)}>
                {isHighlightFormOpen ? '收起表单' : '添加目标'}
                {isHighlightFormOpen ? <X aria-hidden="true" /> : <Plus aria-hidden="true" />}
              </button>
              <button type="button" className="section-action subtle">
                查看计划
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
          {isHighlightFormOpen ? (
            <form className="inline-form" onSubmit={handleHighlightSubmit}>
              <div className="form-row">
                <label className="field">
                  <span>目标标题</span>
                  <input
                    type="text"
                    value={highlightDraft.title}
                    onChange={(event) => handleHighlightChange('title', event.target.value)}
                    placeholder="例如：MUE #0510"
                    required
                  />
                </label>
                <label className="field">
                  <span>关联标签</span>
                  <input
                    type="text"
                    value={highlightDraft.tags}
                    onChange={(event) => handleHighlightChange('tags', event.target.value)}
                    placeholder="逗号分隔，例如：硬件, 仿真"
                  />
                </label>
              </div>
              <div className="form-row">
                <label className="field">
                  <span>目标摘要</span>
                  <input
                    type="text"
                    value={highlightDraft.subtitle}
                    onChange={(event) => handleHighlightChange('subtitle', event.target.value)}
                    placeholder="一句话描述当前阶段"
                  />
                </label>
                <label className="field">
                  <span>完成度</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={highlightDraft.progress}
                    onChange={(event) => handleHighlightChange('progress', Number(event.target.value))}
                  />
                  <span className="range-value">{highlightDraft.progress}%</span>
                </label>
              </div>
              <footer className="form-footer">
                <button type="submit" className="primary">
                  收录到今日目标
                </button>
              </footer>
            </form>
          ) : null}
          <div className="grid three">
            {todayHighlights.map((item) => (
              <article className="card highlight" key={item.title}>
                <header>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </header>
                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="progress">
                  <div className="progress-bar">
                    <span
                      className="progress-fill"
                      style={{ width: `${item.progress}%` }}
                      aria-hidden="true"
                    />
                  </div>
                  <span className="progress-label">完成度 {item.progress}%</span>
                  <input
                    className="progress-slider"
                    type="range"
                    min={0}
                    max={100}
                    value={item.progress}
                    onChange={(event) => handleHighlightProgressChange(item.title, event)}
                    aria-label={`更新 ${item.title} 的完成度`}
                  />
                </div>
                <div className="card-actions">
                  <button
                    type="button"
                    className="chip-button"
                    onClick={() =>
                      setTodayHighlights((prev) =>
                        prev.map((highlight) =>
                          highlight.title === item.title
                            ? { ...highlight, progress: 100 }
                            : highlight,
                        ),
                      )
                    }
                  >
                    <CheckCircle2 aria-hidden="true" /> 完成
                  </button>
                  <button
                    type="button"
                    className="chip-button danger"
                    onClick={() => handleRemoveHighlight(item.title)}
                  >
                    <X aria-hidden="true" /> 移除
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="grid two">
          <section className="card section">
            <div className="section-header">
              <div className="section-title">
                <span className="capsule">复习进度</span>
                <h2>待复习 / DoD</h2>
              </div>
              <div className="section-actions">
                <button type="button" className="section-action" onClick={() => setReviewFormOpen((prev) => !prev)}>
                  {isReviewFormOpen ? '收起表单' : '添加提醒'}
                  {isReviewFormOpen ? <X aria-hidden="true" /> : <Plus aria-hidden="true" />}
                </button>
                <button type="button" className="section-action subtle">
                  打印复盘
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
            {isReviewFormOpen ? (
              <form className="inline-form" onSubmit={handleReviewSubmit}>
                <div className="form-row">
                  <label className="field">
                    <span>复习标题</span>
                    <input
                      type="text"
                      value={reviewDraft.title}
                      onChange={(event) => handleReviewChange('title', event.target.value)}
                      placeholder="例如：增益稳定性复盘"
                      required
                    />
                  </label>
                  <label className="field">
                    <span>截止提醒</span>
                    <input
                      type="text"
                      value={reviewDraft.due}
                      onChange={(event) => handleReviewChange('due', event.target.value)}
                      placeholder="例如：周五 18:00"
                      required
                    />
                  </label>
                </div>
                <label className="field">
                  <span>补充说明</span>
                  <input
                    type="text"
                    value={reviewDraft.detail}
                    onChange={(event) => handleReviewChange('detail', event.target.value)}
                    placeholder="可选：章节、文件名等"
                  />
                </label>
                <footer className="form-footer">
                  <button type="submit" className="primary">
                    添加至复习清单
                  </button>
                </footer>
              </form>
            ) : null}
            <ul className="timeline">
              {reviewList.map((item) => (
                <li key={item.title}>
                  <div className="timeline-icon">
                    <CheckCircle2 aria-hidden="true" />
                  </div>
                  <div>
                    <div className="timeline-header">
                      <h3 className={item.done ? 'is-done' : undefined}>{item.title}</h3>
                      <button
                        type="button"
                        className={`chip-button${item.done ? ' primary' : ''}`}
                        onClick={() => toggleReviewDone(item.title)}
                      >
                        {item.done ? '已完成' : '标记完成'}
                      </button>
                    </div>
                    <p className={item.done ? 'is-done' : undefined}>{item.detail}</p>
                    <span className="due">{item.due}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="card section">
            <div className="section-header">
              <div className="section-title">
                <span className="capsule">知识树</span>
                <h2>知识积木树</h2>
              </div>
              <div className="section-actions">
                <button type="button" className="section-action" onClick={() => setKnowledgeFormOpen((prev) => !prev)}>
                  {isKnowledgeFormOpen ? '收起表单' : '新增素材'}
                  {isKnowledgeFormOpen ? <X aria-hidden="true" /> : <Plus aria-hidden="true" />}
                </button>
                <button type="button" className="section-action subtle">
                  管理资源
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
            {isKnowledgeFormOpen ? (
              <form className="inline-form" onSubmit={handleKnowledgeSubmit}>
                <div className="form-row">
                  <label className="field select">
                    <span>选择或创建分支</span>
                    <div className="select-control">
                      <select
                        value={knowledgeDraft.branchChoice}
                        onChange={(event) => handleKnowledgeChange('branchChoice', event.target.value)}
                      >
                        {knowledgeTree.map((branch) => (
                          <option value={branch.title} key={branch.title}>
                            {branch.title}
                          </option>
                        ))}
                        <option value="__custom">自定义分支…</option>
                      </select>
                      <ChevronDown aria-hidden="true" />
                    </div>
                  </label>
                  {knowledgeDraft.branchChoice === '__custom' ? (
                    <label className="field">
                      <span>新分支名称</span>
                      <input
                        type="text"
                        value={knowledgeDraft.customBranch}
                        onChange={(event) => handleKnowledgeChange('customBranch', event.target.value)}
                        placeholder="例如：系统工程"
                        required
                      />
                    </label>
                  ) : null}
                </div>
                <label className="field">
                  <span>素材条目</span>
                  <input
                    type="text"
                    value={knowledgeDraft.item}
                    onChange={(event) => handleKnowledgeChange('item', event.target.value)}
                    placeholder="输入你要记录的知识资产"
                    required
                  />
                </label>
                <footer className="form-footer">
                  <button type="submit" className="primary">
                    收录到知识树
                  </button>
                </footer>
              </form>
            ) : null}
            <div className="knowledge-tree">
              {knowledgeTree.map((branch) => (
                <div key={branch.title} className="branch">
                  <div className="branch-header">
                    <h3>{branch.title}</h3>
                    <div className="capsule-list">
                      {branch.capsules.map((capsule) => (
                        <span key={capsule} className="capsule small">
                          {capsule}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ul>
                    {branch.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
