import { useQuery } from "@tanstack/react-query"
import { getWritingDetail } from "shared/api/getWritingDetail.tsx"

export const useWritingDetail = (UUID : string) => {
  return useQuery({
    queryKey: ["writingDetail", UUID],
    queryFn: () => getWritingDetail(UUID),
    enabled: !!UUID,
    staleTime: 1000 * 60 * 60,
  })
}