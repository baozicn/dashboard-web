import UnderConstruction from '../components/UnderConstruction';

function CoursesPage() {
  return (
    <UnderConstruction
      title="课程模块"
      description="将在此展示课程列表、章节进度与学习入口，支持浏览课程大纲和进入课程详情。"
    >
      <ul className="empty-state-list">
        <li>课程卡片与进度条，帮助快速掌握学习进度</li>
        <li>章节导航与资料链接，支持进入课程详情页</li>
        <li>与任务、资料库联动，沉淀课程相关资产</li>
      </ul>
    </UnderConstruction>
  );
}

export default CoursesPage;
