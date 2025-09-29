import UnderConstruction from '../components/UnderConstruction';

function LibraryPage() {
  return (
    <UnderConstruction
      title="资料库模块"
      description="统一管理知识素材，支持分支树浏览、搜索与内容编辑，形成技术资产沉淀。"
    >
      <ul className="empty-state-list">
        <li>树状分支导航与列表视图组合，快速定位资料</li>
        <li>新增 / 编辑 / 删除知识条目，并支持批量导入</li>
        <li>与概览知识树同步，保持单一数据源</li>
      </ul>
    </UnderConstruction>
  );
}

export default LibraryPage;
