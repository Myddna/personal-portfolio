import { FunctionComponent } from "react";
import RepoInfo from "./RepoInfo";
import TextBlock from "./ui/TextBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type Props = {
  className?: string;
  repos?: Array<any>;
};

const LatestProjects: FunctionComponent<Props> = ({
  className,
  repos,
}: Props) => {
  const repoList =
    repos &&
    repos
      // Sort by recently updated
      .sort((a: any, b: any) => {
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);
        if (dateA < dateB) {
          return 1;
        } else if (dateA > dateB) {
          return -1;
        } else {
          return 0;
        }
      })
      // Keep the latest 3 updated repos
      .slice(0, 3)
      // Generate the cards
      .map((repo: any, idx: number) => {
        return (
          <RepoInfo key={idx} repo={repo}>
            {repo.id}
          </RepoInfo>
        );
      });

  return (
    <TextBlock className={className}>
      <h1>Latest projects</h1>
      <div className="flex space-x-3">{repoList}</div>
      <div className="mt-8 flex">
        <a
          href="https://github.com/Myddna"
          className="btn btn-primary"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} /> Check out my GitHub
        </a>
      </div>
    </TextBlock>
  );
};

export default LatestProjects;
