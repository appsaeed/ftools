//apps and root import
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePreference } from "../../api/context/PreferenceContext";
import { DotProgress } from "../../components/spinner/Spinner";
import Content from "../layout/Content";

export default function Iploockup() {
  const preference = usePreference();
  const [ip, setIp] = useState("8.8.8.8");
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ip_data, set_ip_data] = useState<any[] | null>(null);

  const loockupme = () => {
    set_ip_data(null);
    setError(null);
    fetch("https://api.ipify.org/?format=json")
      .then((buf) => buf.json())
      .then((res) => setIp(res.ip))
      .catch((err) => setError("ip:  " + err?.message));
  };

  useEffect(() => {
    setError(null);
    if (ip) {
      fetch(`https://ipapi.co/${ip}/json/`)
        .then((buf) => buf.json())
        .then((res) => {
          const arr = [];
          for (const key in res) {
            if (Object.hasOwnProperty.call(res, key)) {
              const _key = key.replace("_", " ");
              const _val = res[key];
              arr.push({ name: _key, value: _val });
            }
          }
          set_ip_data(arr);
        })
        .catch((err) => setError("ipinfo: " + err?.message));
    }
  }, [ip]);

  if (error) {
    toast.error(error);
  }

  return (
    <Content title="Ip lockup">
      <div className="col-md-8">
        <div className="card">
          <div className="border-bottom title-part-padding">
            <h4 className="mb-0">
              <div className="icon-card-title d-flex">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                  onChange={(e) => setIp(e.target.value)}
                  value={ip || ""}
                />
                <button
                  onClick={loockupme}
                  className="btn btn-primary mx-3 me-2 w-25"
                >
                  What's my ip
                </button>
              </div>
            </h4>
          </div>
          <div className="card-body px-2">
            {!ip_data ? (
              <DotProgress />
            ) : (
              <>
                <table
                  className={`table table-striped table-bordered table-${preference.theme}`}
                >
                  <tbody>
                    {ip_data.map((item, key) => (
                      <tr key={key}>
                        <th scope="row">{item.name}</th>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </Content>
  );
}
