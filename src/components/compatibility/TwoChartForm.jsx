"use client";

import { useState } from "react";
import { FiUser, FiUsers, FiHeart } from "react-icons/fi";

import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";

function PartnerCard({ label, icon: Icon }) {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");

  return (
    <div className="glass border border-white/10 rounded-2xl p-7">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-serif text-lg text-white">{label}</h3>
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Name</label>
          <Input placeholder="Full name" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Gender</label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Birth Date</label>
          <DatePicker value={date} onChange={setDate} placeholder="Select date" maxDate={new Date()} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Birth Time</label>
          <TimePicker value={time} onChange={setTime} placeholder="HH:MM" use24Hour={false} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Birth Place</label>
          <Input placeholder="City, state, country" />
        </div>
      </div>
    </div>
  );
}

export default function TwoChartForm({ leftLabel = "Partner 1", rightLabel = "Partner 2", buttonLabel = "Check Compatibility" }) {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <PartnerCard label={leftLabel} icon={FiUser} />
        <PartnerCard label={rightLabel} icon={FiUsers} />
      </div>
      <div className="flex justify-center">
        <Button variant="primary-fill" size="md" type="submit" className="rounded-xl px-10">
          <FiHeart className="w-4 h-4" />
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
