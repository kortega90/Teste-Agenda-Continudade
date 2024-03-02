import "./styles.css";
import ContactTableBody from "../ContactTableBody";
import "./styles.css";
import { ScheduleDTO } from "../../models/Schedule";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

type Props = {
  schedule: ScheduleDTO;
};

export default function ContactCatalogCard({schedule}:Props) {
  // const params = useParams();
  // const navigate = useNavigate();
  // const [schedule, setSchedule] = useState<ScheduleDTO | undefined>();

  // useEffect(() => {
  //   scheduleService
  //     .findScheduleById(Number(params.scheduleId))
  //     .then((response: { data: ScheduleDTO }) => {
  //       setSchedule(response.data);
  //     })
  //     .catch(() => {
  //       navigate("/");
  //     });
  // }, [params.scheduleId, navigate]);


  return (
    <>
      <TableContainer component={Paper} className="table-container">
        <div style={{ padding: "10px 0" }}>
          <h2>
            {" "}
            Contactos da Agenda :<span /> {schedule?.name}
          </h2>
        </div>

        <Table className="agenda-table">
          <TableHead>
            <TableRow>
              <TableCell className="name">Name</TableCell>
              <TableCell className="cep">cep</TableCell>
              <TableCell className="email">email</TableCell>
              <TableCell className="phone">phone</TableCell>
              <TableCell className="cnpj">cnpj</TableCell>
              <TableCell className="cpf">cpf</TableCell>
              <TableCell className="actions">Actions</TableCell>
            </TableRow>
          </TableHead>
          {schedule &&
            schedule.contacts.map((contact) => (
              <ContactTableBody key={contact.id} contact={contact} />
            ))}
        </Table>
      </TableContainer>
    </>
  );
}
