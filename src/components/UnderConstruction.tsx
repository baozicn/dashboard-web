import { ArrowRight } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';

interface UnderConstructionProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

function UnderConstruction({ title, description, actions, children }: PropsWithChildren<UnderConstructionProps>) {
  return (
    <section className="card section under-construction">
      <div className="section-header">
        <div className="section-title">
          <span className="capsule">建设中</span>
          <h2>{title}</h2>
        </div>
        {actions ? <div className="section-actions">{actions}</div> : null}
      </div>
      <div className="empty-state">
        <p>{description}</p>
        {children}
        <div className="empty-state-footer">
          <ArrowRight aria-hidden="true" />
          <span>功能规划已在概览中列出，敬请期待</span>
        </div>
      </div>
    </section>
  );
}

export default UnderConstruction;
