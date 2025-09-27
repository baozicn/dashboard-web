import {
  ArrowRight,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  Compass,
  Library,
  ListChecks,
  LucideIcon,
  Settings,
  Timer,
} from 'lucide-react';
import './App.css';

const todayHighlights = [
  { title: 'MUE #0501', subtitle: 'STM32F407 ECH | LWP 调参', tags: ['控制', '嵌入式'], progress: 62 },
  { title: 'MUE #0502', subtitle: 'BHT70 仿真 | 资料整理', tags: ['仿真', '复盘'], progress: 38 },
  { title: 'MUE #0903', subtitle: 'Buck 200kHz 设计 Review', tags: ['硬件', '迭代'], progress: 73 },
];

const reviewList = [
  { title: '待复习 · 信号与系统', detail: '章节 3：卷积与响应', due: '今日 21:30' },
  { title: 'DoD 检查点', detail: 'MUE #0501 仿真记录上传', due: '明日 09:00' },
  { title: '资源再梳理', detail: 'Buck 设计资料包整理', due: '周四 18:00' },
];

const knowledgeTree = [
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
];

const navItems: { label: string; icon: LucideIcon }[] = [
  { label: '概览', icon: Compass },
  { label: '课程', icon: BookOpen },
  { label: '任务', icon: ListChecks },
  { label: '资料库', icon: Library },
  { label: '日程', icon: Calendar },
  { label: '设置', icon: Settings },
];

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="主导航">
        <div className="brand">
          <div className="logo">技共</div>
          <span className="brand-text">TECH COMMONS</span>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                <button type="button" className="nav-button">
                  <item.icon aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button type="button" className="focus-button">
            <Timer aria-hidden="true" />
            <span>开始专注 45′</span>
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="top-bar">
          <div>
            <p className="subtitle">2025-09-15 · 第 6 周 星期一</p>
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
            <button type="button" className="section-action">
              查看计划
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
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
                  <div className="progress-bar" style={{ width: `${item.progress}%` }} />
                  <span className="progress-label">完成度 {item.progress}%</span>
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
              <button type="button" className="section-action">
                打印复盘
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
            <ul className="timeline">
              {reviewList.map((item) => (
                <li key={item.title}>
                  <div className="timeline-icon">
                    <CheckCircle2 aria-hidden="true" />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
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
              <button type="button" className="section-action">
                管理资源
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
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
