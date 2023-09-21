import React, { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "../services/article";
import "./results.css";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import copy from "../assets/copy.svg";
import link from "../assets/link.svg";
import tick from "../assets/tick.svg";
import loader from "../assets/loader.svg";
const Result = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([
    {
      url: "https://tvtropes.org/pmwiki/pmwiki.php/Series/Supernatural",
      summary:
        "American paranormal/horror show that aired from 2005 to 2020. The series follows the Winchester brothers, Dean and Sam, who hunt creatures based on urban legends, classical mythology, and Abrahamic theology. The show features, a Monster of the Week, structure with an overarching storyline and incorporates humor through fourth wall breaks. The brothers travel from town to town, solving supernatural problems and searching for their missing father in the first season. The show is known for its diverse score of classic rock songs and the iconic 1967 Chevy Impala that Dean drives. It gained popularity for its cast of attractive actors, frequent mood shifts, and the intense emotional and physical torture inflicted on its characters",
    },
    {
      url: "https://www.empireonline.com/movies/features/star-wars-timeline-chronological-order/",
      summary:
        "This text provides a comprehensive overview of the Star Wars timeline, covering various eras, films, series, and video games. It starts with the earliest era, Dawn of the Jedi, and progresses through different eras such as The Old Republic and The High Republic. The prequel trilogy, including specific films like Episode I - The Phantom Menace and Episode II - Attack of the Clones, is discussed, as well as the animated series Star Wars: The Clone Wars and Episode III - Revenge of the Sith. Other series like Star Wars: The Bad Batch and video games are also mentioned. The text then introduces the original Star Wars Holiday Special, which is considered to be terrible and disowned by those involved. It features a central narrative around Chewbacca returning to Kashyyyk to celebrate 'Life Day,' but also includes a variety show format with a Boba Fett cartoon segment, musical numbers, and comedy skits. The special is not available to view on any official channels, but the animated Boba Fett sequence can be found on Disney+. The text goes on to discuss the LEGO Star Wars Holiday Special, which is an improvement on the original. It is a tongue-in-cheek time-hopping animated adventure set after The Rise of Skywalker. The special sees the heroes investigate a Jedi temple that sends them through the Skywalker Saga timeline, mixing up characters, locations, and plot points from all three trilogies. While it does feature some intriguing narrative elements, it is not considered canon and does not inform what comes in the New Jedi Order era. Lastly, the text mentions the made-for-TV Ewok movies, Caravan Of Courage: An Ewok Adventure and Ewoks: The Battle For Endor. These movies, devised by George Lucas, are generally not considered canon and are thought to be of low quality. They take place around 3 BBY and revolve around a group of humans who crash-land on the Ewoks' forest moon and interact with Wicket and his companions. The Battle For Endor takes place six months after Caravan Of Courage, and the human protagonist Cindel departs Endor at the end of the second film to avoid interrupting the events of the original trilogy.",
    },
  ]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleClearHistory = () => {
    localStorage.removeItem("articles");
    setAllArticles([]);
  };

  return (
    <section>
      <div className="container align-items-center justify-content-center">
        <form className="form" id="form-all" onSubmit={handleSubmit}>
          <img className="me-2 link-btn-icon" src={link} alt="" />

          <input
            aria-describedby="basic-addon1"
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            required
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            className="url_input peer url-input form-control"
          />
          <button type="submit" className="submit-btn ms-2">
            <AutoFixHighIcon className="submit-btn-icon fs-4" />
          </button>
        </form>
        <div className="d-flex flex-column mt-4">
          {allArticles.reverse().map((item, index) => (
            <div
              className="link-card d-flex container align-items-center justify-content-start"
              key={`link-${index}`}
              onClick={() => setArticle(item)}
            >
              <div
                className="copy-btn-container"
                onClick={() => handleCopy(item.url)}
              >
                <div className="copy-btn align-items-center justify-content-center">
                  <img src={copied === item.url ? tick : copy} alt="" />
                </div>
              </div>
              <p>{item.url}</p>
            </div>
          ))}
          <button onClick={handleClearHistory} className="clear-history-btn">
            Clear History
          </button>
        </div>
      </div>

      {/* display results */}

      <div>
        {isFetching ? (
          <img
            className="loader-img align-items-center justify-content-center"
            src={loader}
            alt=""
          />
        ) : error ? (
          <p>
            Well that's wasn't expected
            <br />
            <span>{error?.data || error}</span>
          </p>
        ) : (
          article.summary && (
            <div className="summary-content container align-items-center justify-content-center">
              <h2 className="summary-header mt-5 text-center">
                Article <span>Summary</span>
              </h2>
              <div>
                <p className="summary-para container align-items-center justify-content-center">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Result;
