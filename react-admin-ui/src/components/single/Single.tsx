import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCustom } from "../../custom/customApi";

type Props = {
  id: number;
  img?: string;
  title: string;
  info: object;
  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
  activities?: { time: string; text: string }[];
  path: string;
};

const Single = (props: Props) => {
  console.log(" check props", props.path);

  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState(props.info); // Lưu props.info vào state

  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["singleUser"],
    // queryFn: () => customFetch(`/user/${id}`),
    queryFn: () =>
      apiCustom.get(`/${props.path}/${id}`).then((res) => res.data), // Dùng axios
  });

  useEffect(() => {
    const updateInfo = () => {
      setInfo({
        username: data?.user.username,
        email: data?.user.email,
      });
    };
    updateInfo();
  }, [data]);

  // Xử lý khi nhấn "Update"
  const handleEdit = () => {
    setIsEditing(true);
  };
  // Xử lý khi thay đổi input
  const handleChange = (key: any, value: any) => {
    setInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const mutation = useMutation({
    mutationFn: (infoUpdate: {}) => {
      return apiCustom.put(`/${props.path}/${id}`, infoUpdate);
    },
  });

  // Xử lý khi nhấn "Save"
  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated Data:", info); // Bạn có thể gửi lên API ở đây
    mutation.mutate(info);
  };
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.img && <img src={props.img} alt="" />}
            <h1>{props.title}</h1>
            {isEditing ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={handleEdit}>Update</button>
            )}
          </div>
          <div className="details">
            {Object.entries(info).map(([key, value]) => (
              <div className="item" key={key}>
                <span className="itemTitle">{key} </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                ) : (
                  <span className="itemValue">{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <hr />
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Single;
