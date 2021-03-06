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
      // Sort by recently pushed
      .sort((a: any, b: any) => {
        const dateA = new Date(a.pushed_at);
        const dateB = new Date(b.pushed_at);
        if (dateA < dateB) {
          return 1;
        } else if (dateA > dateB) {
          return -1;
        } else {
          return 0;
        }
      })
      // Keep the latest 3 pushed repos
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
      <p>These are the personal projects on which I’ve been working lately.</p>
      <div className="grid md:grid-cols-3 gap-4">{repoList}</div>
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
