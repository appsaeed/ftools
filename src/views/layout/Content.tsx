import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { findMenuNameByPath } from "../../app/functions";
import Footer from "../../components/Footer";

export function PageContent({ children }: { children: ReactNode }) {
  return (
    <div className="container-fluid">
      <div className="row">{children}</div>
    </div>
  );
}

export function PageWrapper({ children }: { children: ReactNode }) {
  return <div className="page-wrapper">{children}</div>;
}

export function PageTitle({ children }: { children?: ReactNode }) {
  const title = findMenuNameByPath(useLocation().pathname);
  return (
    <div className="page-titles pb-0">
      <div className="col-12 col-md-12 align-self-center">
        <h3>{children ? children : title}</h3>
      </div>
    </div>
  );
}

export default function Content({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <PageWrapper>
      <PageTitle>{title}</PageTitle>
      <PageContent>{children}</PageContent>
      <Footer />
    </PageWrapper>
  );
}
