import { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faClock } from "@fortawesome/free-solid-svg-icons";

type Props = {
  repo: any;
};

const RepoInfo: FunctionComponent<Props> = ({ repo }: Props) => {
  const updatedAt = new Date(repo.updated_at);
  return (
    <div className="rounded shadow p-4">
      <div className="mb-3">
        <a
          href={repo.html_url}
          className="no-underline font-title"
          target="_blank"
          rel="noreferrer"
        >
          {repo.name} <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>{" "}
      </div>
      <div className="mb-3">{repo.description}</div>
      <div className="text-sm">
        <span className="sr-only">Last update</span>
        <FontAwesomeIcon icon={faClock} /> {updatedAt.toLocaleString()}
      </div>
    </div>
  );
};

export default RepoInfo;