import {
  CheckCircleFilled,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Empty,
  Input,
  Modal,
  Select,
  Tag,
  Tooltip,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import ToDoServices from "../../services/toDoServices";
import { getErrorMessage, type ErrorResponse } from "../../util/GetError";
import { getUserDetails } from "../../util/GetUser";
import styles from "./ToDoList.module.css";

interface ToDoItem {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  createdBy: string;
}

interface User {
  userId: string;
}

function ToDoList() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allToDo, setAllToDo] = useState<ToDoItem[]>([]);
  const [currentEditItem, setCurrentEditItem] = useState<ToDoItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState<boolean>(false);
  const [currentTaskType, setCurrentTaskType] = useState("incomplete");
  const [filteredToDo, setFilteredToDo] = useState<ToDoItem[]>([]);

  const navigate = useNavigate();

  // Función para resetear el formulario
  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  const getAllToDo = async () => {
    try {
      const user = getUserDetails() as User;
      const response = await ToDoServices.getAllToDo(user.userId);
      console.log(response); // Ahora response es { data: ToDoItem[] }

      if (response.data && Array.isArray(response.data)) {
        setAllToDo(response.data);
      } else {
        console.error("La respuesta no contiene un array de tareas:", response);
        setAllToDo([]);
      }
    } catch (err) {
      console.error("Error fetching ToDos:", err);
      message.error(getErrorMessage(err as ErrorResponse));
    }
  };


  useEffect(() => {
    const user = getUserDetails() as User;
    if (user?.userId) {
      getAllToDo();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const incomplete = allToDo.filter((item) => !item.isCompleted);
    const complete = allToDo.filter((item) => item.isCompleted);
    setFilteredToDo(currentTaskType === "incomplete" ? incomplete : complete);
  }, [allToDo, currentTaskType]);

  const handleSubmitTask = async () => {
    setLoading(true);
    try {
      const user = getUserDetails() as User;
      const data = {
        title,
        description,
        isCompleted: false,
        createdBy: user.userId,
      };

      const newToDo = await ToDoServices.createToDo(data); // ya es un ToDoItem tipado

      message.success("To Do Task Added Successfully!");
      setIsAdding(false);
      resetForm();

      setAllToDo((prev) => [...prev, newToDo]); // Sin errores de tipo
    } catch (err) {
      message.error(getErrorMessage(err as ErrorResponse));
    } finally {
      setLoading(false);
    }
  };

  const getFormattedDate = (value: string) => {
    const date = new Date(value);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEdit = (item: ToDoItem) => {
    setCurrentEditItem(item);
    setUpdatedTitle(item.title);
    setUpdatedDescription(item.description);
    setUpdatedStatus(item.isCompleted);
    setIsEditing(true);
  };

  const handleDelete = async (item: ToDoItem) => {
    try {
      await ToDoServices.deleteToDo(item._id);
      message.success(`${item.title} Deleted Successfully!`);
      getAllToDo();
    } catch (err) {
      message.error(getErrorMessage(err as ErrorResponse));
    }
  };

  const handleUpdateStatus = async (id: string, status: boolean) => {
    try {
      await ToDoServices.updateToDo(id, { isCompleted: status });
      message.success("Task Status Updated Successfully!");

      // Actualización optimista del estado
      setAllToDo((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isCompleted: status } : item
        )
      );
    } catch (err) {
      message.error(getErrorMessage(err as ErrorResponse));
      // Revertir en caso de error
      setAllToDo((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isCompleted: !status } : item
        )
      );
    }
  };

  const handleUpdateTask = async () => {
    setLoading(true);
    try {
      if (!currentEditItem) return;

      const data = {
        title: updatedTitle,
        description: updatedDescription,
        isCompleted: updatedStatus,
      };

      await ToDoServices.updateToDo(currentEditItem._id, data);
      message.success(`${currentEditItem.title} Updated Successfully!`);
      setIsEditing(false);
      getAllToDo(); // Re-fetch tasks after update
    } catch (err) {
      message.error(getErrorMessage(err as ErrorResponse));
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (value: string) => {
    setCurrentTaskType(value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    const filteredList = allToDo.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredToDo(query ? filteredList : allToDo); // Si no hay búsqueda, mostrar todas las tareas
  };

  return (
    <>
      <Navbar active={"myTask"} />
      <section className={styles.toDoWrapper}>
        <div className={styles.toDoHeader}>
          <h2>Your Tasks</h2>
          <Input
            style={{ width: "50%" }}
            onChange={handleSearch}
            placeholder="Search Your Task Here..."
          />
          <div>
            <Button
              onClick={() => setIsAdding(true)}
              type="primary"
              size="large"
            >
              Add Task
            </Button>
            <Select
              value={currentTaskType}
              style={{ width: 180, marginLeft: "10px" }}
              onChange={handleTypeChange}
              size="large"
              options={[
                { value: "incomplete", label: "Incomplete" },
                { value: "complete", label: "Complete" },
              ]}
            />
          </div>
        </div>
        <Divider />

        <div className={styles.toDoListCardWrapper}>
          {(filteredToDo.length > 0 ? filteredToDo : allToDo).map((item) => {
            if (!item._id) {
              console.error("Item sin _id:", item);
              return null;
            }

            return (
              <div key={item._id} className={styles.toDoCard}>
                <div>
                  <div className={styles.toDoCardHeader}>
                    <h3>{item.title}</h3>
                    <Tag color={item.isCompleted ? "cyan" : "red"}>
                      {item.isCompleted ? "Completed" : "Incomplete"}
                    </Tag>
                  </div>
                  <p>{item.description}</p>
                </div>

                <div className={styles.toDoCardFooter}>
                  <Tag>{getFormattedDate(item.createdAt)}</Tag>
                  <div className={styles.toDoFooterAction}>
                    <Tooltip title="Edit Task">
                      <EditOutlined
                        onClick={() => handleEdit(item)}
                        className={styles.actionIcon}
                      />
                    </Tooltip>
                    <Tooltip title="Delete Task">
                      <DeleteOutlined
                        onClick={() => handleDelete(item)}
                        style={{ color: "red" }}
                        className={styles.actionIcon}
                      />
                    </Tooltip>
                    {item.isCompleted ? (
                      <Tooltip title="Mark as Incomplete">
                        <CheckCircleFilled
                          onClick={() => handleUpdateStatus(item._id, false)}
                          style={{ color: "green" }}
                          className={styles.actionIcon}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Mark as Completed">
                        <CheckCircleOutlined
                          onClick={() => handleUpdateStatus(item._id, true)}
                          className={styles.actionIcon}
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {!filteredToDo.length && !allToDo.length && (
            <div className={styles.noTaskWrapper}>
              <Empty />
            </div>
          )}
        </div>

        {/* Modales */}
        <Modal
          title="Add New To Do Task"
          open={isAdding}
          onOk={handleSubmitTask}
          onCancel={() => {
            setIsAdding(false);
            resetForm(); // Limpia los campos al cancelar
          }}
          confirmLoading={loading}
        >
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <Input.TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal>

        <Modal
          title={`Update ${currentEditItem?.title || "Task"}`}
          open={isEditing}
          onOk={handleUpdateTask}
          onCancel={() => setIsEditing(false)}
          confirmLoading={loading}
        >
          <Input
            placeholder="Updated Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <Input.TextArea
            placeholder="Updated Description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <Select
            value={updatedStatus}
            onChange={(value: boolean) => setUpdatedStatus(value)}
            options={[
              { value: false, label: "Not Completed" },
              { value: true, label: "Completed" },
            ]}
          />
        </Modal>
      </section>
    </>
  );
}

export default ToDoList;
