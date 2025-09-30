import UnderConstruction from '../components/UnderConstruction';

function SettingsPage() {
  return (
    <UnderConstruction
      title="设置模块"
      description="将在这里配置账户偏好、主题模式和通知策略，支持多端个性化。"
    >
      <ul className="empty-state-list">
        <li>基础信息与团队配置，预留多用户扩展接口</li>
        <li>主题切换、字体与布局调整等个性化选项</li>
        <li>通知、提醒与数据同步的偏好设定</li>
      </ul>
    </UnderConstruction>
  );
}

export default SettingsPage;
