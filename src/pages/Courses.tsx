import { BookOpenCheck, CalendarDays, CheckCircle2, PlayCircle, Sparkles, Tag } from 'lucide-react';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

interface CourseOutlineItem {
  title: string;
  duration: string;
  completed: boolean;
}

interface CourseResource {
  title: string;
  type: string;
}

interface CourseTask {
  title: string;
  due: string;
  type: 'task' | 'review';
}

interface Course {
  id: string;
  title: string;
  subtitle: string;
  instructor: string;
  tags: string[];
  status: 'active' | 'completed' | 'planned';
  progress: number;
  completedChapters: number;
  totalChapters: number;
  nextSession: string;
  overview: string;
  outline: CourseOutlineItem[];
  keyResources: CourseResource[];
  upcomingTasks: CourseTask[];
}

const initialCourses: Course[] = [
  {
    id: 'mue-0501',
    title: 'MUE #0501 · 数模协同',
    subtitle: 'STM32F407 ECH 调参与实验记录',
    instructor: '导师：Evelyn 郑',
    tags: ['控制', '嵌入式', '实验'],
    status: 'active',
    progress: 62,
    completedChapters: 5,
    totalChapters: 8,
    nextSession: '周四 14:00 · 迭代评审',
    overview:
      '聚焦数模协同的控制策略优化，本周目标是验证新一版参数并固化实验记录，确保下周进入批量测试。',
    outline: [
      { title: '章节 1 · 控制模型回顾', duration: '45′', completed: true },
      { title: '章节 2 · 驱动板接口梳理', duration: '40′', completed: true },
      { title: '章节 3 · 参数扫频与结果分析', duration: '55′', completed: true },
      { title: '章节 4 · 迭代方案设计', duration: '60′', completed: false },
      { title: '章节 5 · 实验记录与复盘', duration: '40′', completed: false },
    ],
    keyResources: [
      { title: '调参实验记录表（最新版）', type: '表格' },
      { title: 'MATLAB 批量仿真脚本', type: '代码' },
      { title: '控制策略评审纪要', type: '文档' },
    ],
    upcomingTasks: [
      { title: '更新 PID 参数实验日志', due: '今日 · 21:30 截止', type: 'task' },
      { title: '整理控制策略复盘 PPT', due: '周五 · 09:00', type: 'review' },
    ],
  },
  {
    id: 'mue-0502',
    title: 'MUE #0502 · BHT70 仿真',
    subtitle: '高频 Buck 拓扑失效模式分析',
    instructor: '导师：陈工',
    tags: ['仿真', '功率', '验证'],
    status: 'active',
    progress: 48,
    completedChapters: 4,
    totalChapters: 9,
    nextSession: '周三 10:00 · 模型联调',
    overview: '搭建 BHT70 高频仿真场景，验证不同磁性件参数对效率的影响，并输出仿真报告。',
    outline: [
      { title: '章节 1 · Buck 基础回顾', duration: '30′', completed: true },
      { title: '章节 2 · 仿真环境准备', duration: '35′', completed: true },
      { title: '章节 3 · 关键参数扫描', duration: '55′', completed: false },
      { title: '章节 4 · 故障模式注入', duration: '45′', completed: false },
      { title: '章节 5 · 数据整理与结论', duration: '40′', completed: false },
    ],
    keyResources: [
      { title: 'PSIM 模板项目包', type: '工程' },
      { title: '磁性件损耗模型 V2', type: '文档' },
    ],
    upcomingTasks: [
      { title: '补充 200kHz 工况仿真截图', due: '明日 · 18:00', type: 'task' },
      { title: '与电源设计团队同步评审', due: '周四 · 15:30', type: 'review' },
    ],
  },
  {
    id: 'mue-0503',
    title: 'MUE #0503 · 知识资产沉淀',
    subtitle: '资料库分支结构梳理与标签体系搭建',
    instructor: '主持：技共学习台面',
    tags: ['知识库', '结构化', '沉淀'],
    status: 'planned',
    progress: 15,
    completedChapters: 1,
    totalChapters: 6,
    nextSession: '下周一 09:30 · 工作坊',
    overview: '围绕知识积木树，搭建统一的标签和分支体系，便于跨项目检索复用。',
    outline: [
      { title: '章节 1 · 现状盘点', duration: '30′', completed: true },
      { title: '章节 2 · 标签方案共创', duration: '50′', completed: false },
      { title: '章节 3 · 分支映射草拟', duration: '45′', completed: false },
      { title: '章节 4 · 工具链联动', duration: '40′', completed: false },
    ],
    keyResources: [
      { title: '资料库现状盘点表', type: '表格' },
      { title: '知识树结构草案', type: '白板' },
    ],
    upcomingTasks: [
      { title: '邀请核心成员参与标签共创', due: '本周 · 发送邀请', type: 'task' },
    ],
  },
  {
    id: 'mue-0408',
    title: 'MUE #0408 · Buck 200kHz 设计',
    subtitle: '硬件版图确认与投板准备',
    instructor: '导师：胡工',
    tags: ['硬件', '版图', '验证'],
    status: 'completed',
    progress: 100,
    completedChapters: 7,
    totalChapters: 7,
    nextSession: '已结项 · 待归档',
    overview: '完成 Buck 200kHz 设计的版图确认与物料核对，等待最终投板。',
    outline: [
      { title: '章节 1 · 规格确认', duration: '30′', completed: true },
      { title: '章节 2 · 原理图校审', duration: '45′', completed: true },
      { title: '章节 3 · 版图走查', duration: '60′', completed: true },
      { title: '章节 4 · BOM 核对', duration: '40′', completed: true },
      { title: '章节 5 · 风险清单', duration: '30′', completed: true },
    ],
    keyResources: [
      { title: '版图走查记录', type: '文档' },
      { title: '风险清单 Checklist', type: '表格' },
    ],
    upcomingTasks: [
      { title: '整理归档资料', due: '完成 · 等待上传', type: 'review' },
    ],
  },
];

const statusLabels: Record<Course['status'], string> = {
  active: '进行中',
  completed: '已完成',
  planned: '规划中',
};

function CoursesPage() {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Course['status']>('all');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(initialCourses[0]?.id ?? null);

  const filteredCourses = useMemo(() => {
    return initialCourses.filter((course) => {
      const matchStatus = statusFilter === 'all' || course.status === statusFilter;
      const matchKeyword = searchValue
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .every((keyword) =>
          [course.title, course.subtitle, course.tags.join(' '), course.instructor]
            .join(' ')
            .toLowerCase()
            .includes(keyword),
        );
      return matchStatus && matchKeyword;
    });
  }, [searchValue, statusFilter]);

  const selectedCourse = useMemo(
    () => filteredCourses.find((course) => course.id === selectedCourseId) ?? filteredCourses[0] ?? null,
    [filteredCourses, selectedCourseId],
  );

  useEffect(() => {
    if (selectedCourse && selectedCourse.id !== selectedCourseId) {
      setSelectedCourseId(selectedCourse.id);
    }
    if (!selectedCourse && filteredCourses.length === 0) {
      setSelectedCourseId(null);
    }
  }, [filteredCourses, selectedCourse, selectedCourseId]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleStatusChange = (nextStatus: 'all' | Course['status']) => {
    setStatusFilter(nextStatus);
  };

  return (
    <div className="courses-layout">
      <section className="card section courses-list">
        <div className="section-header">
          <div className="section-title">
            <span className="capsule">课程总览</span>
            <h2>学习路径</h2>
          </div>
        </div>
        <div className="courses-filter-bar">
          <input
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="搜索课程、标签或导师"
            className="search-field"
            aria-label="搜索课程"
          />
          <div className="status-filter" role="group" aria-label="课程状态筛选">
            {[
              { value: 'all' as const, label: '全部' },
              { value: 'active' as const, label: '进行中' },
              { value: 'planned' as const, label: '规划中' },
              { value: 'completed' as const, label: '已完成' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                className={`chip-button${statusFilter === option.value ? ' primary' : ''}`}
                onClick={() => handleStatusChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="courses-list-body">
          {filteredCourses.length === 0 ? (
            <div className="empty-state compact">
              <Sparkles aria-hidden="true" />
              <p>没有符合筛选条件的课程，试试调整搜索关键词或状态筛选。</p>
            </div>
          ) : (
            <ul className="course-cards" role="list">
              {filteredCourses.map((course) => (
                <li key={course.id}>
                  <button
                    type="button"
                    className={`course-card${selectedCourse?.id === course.id ? ' is-active' : ''}`}
                    onClick={() => setSelectedCourseId(course.id)}
                  >
                    <div className="course-card-header">
                      <div>
                        <h3>{course.title}</h3>
                        <p>{course.subtitle}</p>
                      </div>
                      <span className={`status-badge status-${course.status}`}>{statusLabels[course.status]}</span>
                    </div>
                    <div className="course-card-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                      </div>
                      <span>
                        {course.completedChapters}/{course.totalChapters} 章节
                      </span>
                    </div>
                    <div className="tag-row">
                      {course.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="course-card-meta">
                      <span>
                        <CalendarDays aria-hidden="true" />
                        {course.nextSession}
                      </span>
                      <span>
                        <BookOpenCheck aria-hidden="true" />
                        完成度 {course.progress}%
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="card section course-details">
        <div className="section-header">
          <div className="section-title">
            <span className="capsule">课程详情</span>
            <h2>{selectedCourse ? selectedCourse.title : '等待选择课程'}</h2>
            {selectedCourse ? <p className="subtitle">{selectedCourse.subtitle}</p> : null}
          </div>
          {selectedCourse ? (
            <div className="section-actions">
              <button type="button" className="chip-button primary">
                <PlayCircle aria-hidden="true" /> 开始学习
              </button>
              <button type="button" className="chip-button">
                <CalendarDays aria-hidden="true" /> 安排日程
              </button>
            </div>
          ) : null}
        </div>

        {selectedCourse ? (
          <div className="course-detail-body">
            <div className="course-detail-hero">
              <div>
                <p className="course-instructor">{selectedCourse.instructor}</p>
                <p className="course-overview">{selectedCourse.overview}</p>
              </div>
              <div className="course-detail-progress">
                <span className="status-badge status-pill">{statusLabels[selectedCourse.status]}</span>
                <div className="progress-bar large">
                  <div className="progress-fill" style={{ width: `${selectedCourse.progress}%` }} />
                </div>
                <p className="progress-label">
                  已完成 {selectedCourse.completedChapters} / {selectedCourse.totalChapters} 章节
                </p>
              </div>
            </div>

            <div className="course-outline">
              <h3>
                <Tag aria-hidden="true" /> 学习章节
              </h3>
              <ol>
                {selectedCourse.outline.map((item) => (
                  <li key={item.title} className={item.completed ? 'is-completed' : ''}>
                    <div className="outline-title">
                      <CheckCircle2 aria-hidden="true" />
                      <span>{item.title}</span>
                    </div>
                    <span className="outline-duration">{item.duration}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="course-panels">
              <div className="course-panel">
                <h3>关键资源</h3>
                <ul>
                  {selectedCourse.keyResources.map((resource) => (
                    <li key={resource.title}>
                      <span className="resource-type">{resource.type}</span>
                      <span className="resource-title">{resource.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="course-panel">
                <h3>待跟进事项</h3>
                <ul>
                  {selectedCourse.upcomingTasks.map((task) => (
                    <li key={task.title} className={`task-${task.type}`}>
                      <span className="task-title">{task.title}</span>
                      <span className="task-due">{task.due}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state compact">
            <Sparkles aria-hidden="true" />
            <p>从左侧选择一门课程，即可查看学习章节、资源与待跟进事项。</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default CoursesPage;
