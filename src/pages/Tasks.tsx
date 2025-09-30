import UnderConstruction from '../components/UnderConstruction';

function TasksPage() {
  return (
    <UnderConstruction
      title="任务模块"
      description="集中管理项目任务与待办，将支持筛选、编辑以及与“今日三件事”联动。"
    >
      <ul className="empty-state-list">
        <li>任务列表视图与标签分类，支持排序筛选</li>
        <li>新增 / 编辑 / 删除任务，追踪截止时间与优先级</li>
        <li>一键标记为今日重点，与概览模块同步</li>
      </ul>
    </UnderConstruction>
  );
}

export default TasksPage;
