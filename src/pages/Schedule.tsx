import UnderConstruction from '../components/UnderConstruction';

function SchedulePage() {
  return (
    <UnderConstruction
      title="日程模块"
      description="将在此呈现周/月视图日历，集中管理任务截止与学习安排，并提供提醒。"
    >
      <ul className="empty-state-list">
        <li>日历视图标注任务、课程与提醒事件</li>
        <li>新增 / 编辑日程，并支持提醒设置</li>
        <li>任务与课程的关键节点自动同步到日历</li>
      </ul>
    </UnderConstruction>
  );
}

export default SchedulePage;
