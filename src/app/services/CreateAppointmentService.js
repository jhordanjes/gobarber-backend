import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Notification from '../schemas/Notification';

import User from '../models/User';
import Appointment from '../models/Appointment';

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    // Verificar se provider_id é um provider

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      throw new Error('You can only create appointments with providers');
    }

    // verificando se é uma data posterior a atual.
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      throw new Error('Past date are not permitted');
    }

    // verificando se a data ta disponivel

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      throw new Error('Appointment date is not available');
    }

    if (provider_id === user_id) {
      throw new Error('Not allowed with the same provider');
    }

    // Criando o Appointment

    const appointment = await Appointment.create({
      user_id,
      provider_id,
      date,
    });

    // Criando Notificacao para o prestador de serviço

    const user = await User.findByPk(user_id);
    const formanttedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h' ",
      {
        locale: pt,
      }
    );
    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formanttedDate}`,
      user: provider_id,
    });

    return appointment;
  }
}

export default new CreateAppointmentService();
